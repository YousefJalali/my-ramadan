import { Heading } from '@/components/ui/heading'
import { VStack } from '@/components/ui/vstack'
import { Slot } from 'expo-router'
import { useSearchParams, useSegments } from 'expo-router/build/hooks'

export default function SettingsLayout() {
  const segments = useSegments()

  return (
    <VStack className='p-6 bg-white flex-1'>
      <Heading size='3xl' className='capitalize mb-14'>
        {segments[segments.length - 1].replaceAll('-', ' ')}
      </Heading>
      <Slot />
    </VStack>
  )
}
