import { Heading } from '@/components/ui/heading'
import { VStack } from '@/components/ui/vstack'
import { Slot } from 'expo-router'
import { useGlobalSearchParams, useSegments } from 'expo-router/build/hooks'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

function urlToTitle(url: string) {
  return url.replaceAll('-', ' ').trim()
}

export default function SettingsLayout() {
  const segments = useSegments()
  const { t } = useTranslation()
  const { method } = useGlobalSearchParams()

  let title = urlToTitle(segments[segments.length - 1])

  if (method && typeof method === 'string') title = urlToTitle(method)

  return (
    <VStack className='px-6 flex-1 bg-neutral-50'>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <Heading size='3xl' className='capitalize my-6'>
          {t(title)}
        </Heading>
        <Slot />
      </ScrollView>
    </VStack>
  )
}
