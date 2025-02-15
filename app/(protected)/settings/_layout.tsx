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
    <ScrollView
      className='p-6 bg-white'
      contentContainerStyle={{ paddingBottom: 200 }}
    >
      <Heading size='3xl' className='capitalize mb-10'>
        {t(segments[segments.length - 1].replaceAll('-', ' ').trim())}
      </Heading>
      <Slot />
    </ScrollView>
  )
}
