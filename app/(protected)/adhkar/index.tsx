import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import adhkar from '@/data/adhkar.json'
import SettingsLink from '@/components/SettingsLink'
import { useTranslation } from 'react-i18next'
import { FlashList } from '@shopify/flash-list'
import PageListLayout from '@/components/PageListLayout'

export default function Adhkar() {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <PageListLayout pageTitle='adhkar'>
      {(scrollHandler, ref) => (
        <FlashList
          onScroll={scrollHandler}
          ListHeaderComponent={() => (
            <Heading size='3xl' className='capitalize mt-6 mb-4'>
              {t('adhkar')}
            </Heading>
          )}
          data={adhkar}
          renderItem={({ item: { id, title_en, title_ar }, index }) => (
            <SettingsLink
              key={id}
              subText={language === 'en-US' ? title_en : title_ar}
              path={`/(protected)/adhkar/category/${index}`}
            />
          )}
          estimatedItemSize={131}
          ListEmptyComponent={<Text>No results found</Text>}
        />
      )}
    </PageListLayout>
  )
}
