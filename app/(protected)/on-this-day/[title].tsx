import { Heading } from '@/components/ui/heading'
import { ScrollView } from '@/components/ui/scroll-view'
import { VStack } from '@/components/ui/vstack'
import flashback from '@/constants/flashback'
import Markdown from '@ronradtke/react-native-markdown-display'
import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function FlashbackDetails() {
  const { title } = useLocalSearchParams()
  const {
    i18n: { language },
  } = useTranslation()

  const article = flashback[language][0].find((c) => c.id === title)

  return (
    <VStack className='px-6 flex-1 bg-background-50'>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Heading size='3xl' className='mt-6'>
          {article?.title}
        </Heading>

        <Markdown>{article?.details || ''}</Markdown>
      </ScrollView>
    </VStack>
  )
}
