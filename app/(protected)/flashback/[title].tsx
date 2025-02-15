import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { ScrollView } from '@/components/ui/scroll-view'
import { VStack } from '@/components/ui/vstack'
import flashback from '@/constants/flashback'
import Markdown from '@ronradtke/react-native-markdown-display'
import { useRouter, useLocalSearchParams, Stack } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

export default function FlashbackDetails() {
  const { back } = useRouter()
  const { title } = useLocalSearchParams()
  const {
    i18n: { language },
  } = useTranslation()

  const article = flashback[language][0].find((c) => c.id === title)

  return (
    <>
      <Stack.Screen
        options={{
          title: article?.title,
          headerLeft: () => <></>,
          headerRight: () => (
            <Pressable onPress={() => back()}>
              <Icon as={ChevronLeft} className='h-8 w-8 -ml-3' />
            </Pressable>
          ),
        }}
      />

      <VStack>
        <ScrollView className='p-6'>
          <Heading size='3xl'>{title}</Heading>

          <Markdown>{article?.details || ''}</Markdown>
        </ScrollView>
      </VStack>
    </>
  )
}
