import { Center } from '@/components/ui/center'
import { Slot } from 'expo-router'

export default function AuthLayout() {
  return (
    <Center className='flex-1 mx-6'>
      <Slot />
    </Center>
  )
}
