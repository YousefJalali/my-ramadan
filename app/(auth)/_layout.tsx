import GoBackBtn from '@/components/GoBackBtn'
import { Center } from '@/components/ui/center'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { session$ } from '@/stores/store'
import { use$ } from '@legendapp/state/react'
import { Redirect, Slot } from 'expo-router'

export default function AuthLayout() {
  let session = use$(session$)

  if (session) {
    return <Redirect href='/' />
  }

  return (
    <VStack className='flex-1 p-6 bg-background-50'>
      <HStack className='mt-12'>
        <GoBackBtn />
      </HStack>
      <Center className='flex-1'>
        <Slot />
      </Center>
    </VStack>
  )
}
