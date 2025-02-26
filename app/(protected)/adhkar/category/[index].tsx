import { Text } from '@/components/ui/text'
import { useLocalSearchParams } from 'expo-router'
import adhkar from '@/data/adhkar.json'
import { Heading } from '@/components/ui/heading'
import DikrCard from '@/components/DikrCard'
import { useTranslation } from 'react-i18next'
import { FlashList } from '@shopify/flash-list'
import PageListLayout from '@/components/PageListLayout'

export default function AdhkarCategory() {
  const { index } = useLocalSearchParams()

  const {
    t,
    i18n: { language },
  } = useTranslation()

  if (typeof index !== 'string') {
    return null
  }

  const list = adhkar[+index]
  const title = language === 'en-US' ? list.title_en : list.title_ar

  return (
    <PageListLayout pageTitle={title}>
      {(scrollHandler, getHeaderHeight) => (
        <FlashList
          ListHeaderComponent={() => (
            <Heading
              onLayout={getHeaderHeight}
              size='3xl'
              className='capitalize mt-6 mb-4'
            >
              {title}
            </Heading>
          )}
          onScroll={scrollHandler}
          data={[...list.list]}
          renderItem={({
            item: { id, text_en, text_ar, repeat, audio_uri },
            index,
          }) => (
            <DikrCard
              key={id}
              text={language === 'en-US' ? text_en : text_ar}
              count={repeat}
              audioUri={audio_uri}
            />
          )}
          estimatedItemSize={250}
          ListEmptyComponent={<Text>No results found</Text>}
        />
      )}
    </PageListLayout>
  )
}
