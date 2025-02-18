import { MapPin } from 'lucide-react-native'
import { HStack } from './ui/hstack'
import { Icon } from './ui/icon'
import { Text } from './ui/text'
import { useLocation } from '@/hooks/useLocation'

export default function LocationDisplay() {
  const { error, location } = useLocation()

  return location.city ? (
    <HStack
      space='xs'
      className='items-center mb-2 bg-neutral-100/20 py-1 px-2 rounded-lg'
    >
      <Text size='lg' className='text-primary-100'>
        {`${location.city}, ${location.country}`}
      </Text>
      <Icon as={MapPin} size='md' className='text-primary-100' />
    </HStack>
  ) : null
}
