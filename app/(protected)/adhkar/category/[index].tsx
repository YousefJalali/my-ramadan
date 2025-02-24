import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { useLocalSearchParams } from 'expo-router'
import adhkar from '@/data/adhkar.json'
import { ScrollView } from 'react-native'
import { Heading } from '@/components/ui/heading'
import DikrCard from '@/components/DikrCard'
import { useTranslation } from 'react-i18next'
import { FlashList } from '@shopify/flash-list'

export default function AdhkarCategory() {
  const { index } = useLocalSearchParams()

  const {
    i18n: { language },
  } = useTranslation()

  if (typeof index !== 'string') {
    return null
  }

  return (
    <VStack className='bg-neutral-50 flex-1'>
      <Heading size='2xl' className='mt-6 px-6'>
        {language === 'en-US' ? adhkar[+index].TITLE : adhkar[+index].TITLE_AR}
      </Heading>

      <VStack className='flex-1 p-6 pb-32'>
        <FlashList
          data={adhkar[+index].TEXT}
          renderItem={({
            item: { ID, TRANSLATED_TEXT, ARABIC_TEXT, AUDIO, REPEAT },
            index,
          }) => (
            <DikrCard
              key={ID}
              text={language === 'en-US' ? TRANSLATED_TEXT : ARABIC_TEXT}
              count={REPEAT}
              audioUri={AUDIO}
            />
          )}
          estimatedItemSize={250}
          ListEmptyComponent={<Text>No results found</Text>}
        />
      </VStack>
    </VStack>
  )
}
