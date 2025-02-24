import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { ScrollView } from 'react-native'
import adhkar from '@/data/adhkar.json'
import SettingsLink from '@/components/SettingsLink'
import { useTranslation } from 'react-i18next'
import { FlashList } from '@shopify/flash-list'

export default function Adhkar() {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  // const arr = []

  // for (let i = 0; i < Object.keys(adhkarEN).length; i++) {
  //   const key = Object.keys(adhkarEN)[i]
  //   const value = Object.values(adhkarEN)[i]
  //   const ar = adhkar.find((d) => d.audio === value.AUDIO_URL)

  //   arr.push({
  //     ...value,
  //     TITLE_AR: ar?.category,
  //   })
  // }

  // console.log(arr)

  return (
    <VStack className='flex-1 px-6'>
      <Heading size='3xl' className='capitalize mt-6'>
        {t('adhkar')}
      </Heading>

      <FlashList
        data={adhkar}
        renderItem={({ item: { TITLE, ID, TITLE_AR }, index }) => (
          <SettingsLink
            key={ID}
            subText={language === 'en-US' ? TITLE : TITLE_AR}
            path={`/(protected)/adhkar/category/${index}`}
          />
        )}
        estimatedItemSize={250}
        ListEmptyComponent={<Text>No results found</Text>}
      />
    </VStack>
  )
}
