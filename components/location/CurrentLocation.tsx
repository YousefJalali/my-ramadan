import { getLocation } from '@/utils/getLocation'
import { Button, ButtonText } from '../ui/button'
import { Heading } from '../ui/heading'
import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'
import { Text } from '@/components/ui/text'
import { settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { useState } from 'react'

export default function CurrentLocation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentLocation = use$(settings$.location)

  async function relocateHandler() {
    setError(null)
    setLoading(true)
    const { location, error, region } = await getLocation()
    setLoading(false)

    if (error || !region?.country || !region?.city || !location) {
      setError('Something went wrong! Try again')
      return
    }

    settings$.location.set({
      country: region.country,
      city: region.city,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    })
  }

  return (
    <HStack className='mb-8 justify-between items-end'>
      <VStack space='xs'>
        <Heading size='md'>Current Location</Heading>
        <Text className='leading-loose'>
          {currentLocation
            ? `${currentLocation.city}, ${currentLocation.country}`
            : 'Nothing'}
        </Text>
      </VStack>

      <VStack className='items-end'>
        {error ? (
          <Text size='sm' className='leading-loose text-error-600'>
            {error}
          </Text>
        ) : null}

        <Button size='sm' variant='link' onPress={relocateHandler}>
          <ButtonText>{loading ? 'Relocating...' : 'Relocate'}</ButtonText>
        </Button>
      </VStack>
    </HStack>
  )
}
