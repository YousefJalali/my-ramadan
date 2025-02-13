import { Heading } from '@/components/ui/heading'
import { Slot } from 'expo-router'
import { useSegments } from 'expo-router/build/hooks'
import { ScrollView } from 'react-native'

export default function SettingsLayout() {
  const segments = useSegments()

  return (
    <ScrollView className='p-6 pb-12 mb-12 bg-white flex-1'>
      <Heading size='3xl' className='capitalize mb-10'>
        {segments[segments.length - 1].replaceAll('-', ' ')}
      </Heading>
      <Slot />
    </ScrollView>
  )
}
