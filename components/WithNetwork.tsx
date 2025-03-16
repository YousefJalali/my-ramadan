import { ReactNode, useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Icon } from '@/components/ui/icon'
import { WifiOff } from 'lucide-react-native'
import { Center } from './ui/center'

export default function WithNetwork({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)

  //check internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!(state.isConnected && state.isInternetReachable))
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      {children}
      {!isConnected ? (
        <Center className='absolute top-0 left-0 w-full h-full bg-background-50 gap-1'>
          <Icon as={WifiOff} className='h-20 w-20 mb-4' />
          <Text size='lg'>No Internet Connection</Text>
          <Text size='sm'>Check your connection and try again.</Text>
        </Center>
      ) : null}
    </>
  )
}
