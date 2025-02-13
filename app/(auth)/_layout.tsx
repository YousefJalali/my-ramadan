import { Center } from '@/components/ui/center'
import { session$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { Redirect, Slot } from 'expo-router'

export default function AuthLayout() {
  let session = use$(session$)

  if (session) {
    return <Redirect href='/' />
  }

  return (
    <Center className='flex-1 mx-6'>
      <Slot />
    </Center>
  )
}
