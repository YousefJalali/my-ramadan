import { Heading } from '@/components/ui/heading'
import { VStack } from '@/components/ui/vstack'
import { Slot } from 'expo-router'
import { useSegments } from 'expo-router/build/hooks'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

export default function SettingsLayout() {
  const segments = useSegments()
  const { t } = useTranslation()

  return (
    <VStack className='px-6 flex-1 bg-neutral-50'>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <Heading size='3xl' className='capitalize mb-6 mt-6'>
          {t(segments[segments.length - 1].replaceAll('-', ' ').trim())}
        </Heading>
        <Slot />
      </ScrollView>
    </VStack>
  )
}
