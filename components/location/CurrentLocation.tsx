import { getLocation } from '@/utils/getLocation'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { useState } from 'react'
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert'
import { Icon } from '@/components/ui/icon'
import { InfoIcon, X } from 'lucide-react-native'
import { Pressable } from '@/components/ui/pressable'
import { Linking } from 'react-native'
import { useTranslation } from 'react-i18next'

export default function CurrentLocation() {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const storedLocation = use$(settings$.location)

  async function relocateHandler() {
    setError(null)
    setLoading(true)
    const { location, error, region } = await getLocation()
    setLoading(false)

    if (error || !region?.country || !region?.city || !location) {
      setError(error)
      return
    }

    settings$.location.change({
      country: region.country,
      city: region.city,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    })
  }

  return (
    <VStack className='mb-6'>
      <HStack className='justify-between items-end'>
        <VStack space='xs'>
          <Heading size='md'>{t('current location')}</Heading>
          <Text className='leading-loose'>
            {storedLocation.current
              ? `${storedLocation.current.city}, ${storedLocation.current.country}`
              : 'Nothing'}
          </Text>
        </VStack>

        <VStack className='items-end'>
          <Button size='sm' variant='link' onPress={relocateHandler}>
            <ButtonText>
              {loading ? t('relocating...') : t('relocate')}
            </ButtonText>
          </Button>
        </VStack>
      </HStack>

      {error ? (
        <Alert action='warning' className='gap-4 items-start mt-2'>
          <AlertIcon as={InfoIcon} className='mt-1' />
          <VStack className='flex-1' space='sm'>
            <AlertText className='font-semibold text-warning-900' size='sm'>
              {t(error)}
            </AlertText>

            <Button
              size='sm'
              variant='link'
              className='self-start'
              onPress={() => {
                Linking.openSettings()
              }}
            >
              <ButtonText>{t('open settings')}</ButtonText>
            </Button>
          </VStack>

          <Pressable onPress={() => setError(null)}>
            <Icon as={X} />
          </Pressable>
        </Alert>
      ) : null}
    </VStack>
  )
}
