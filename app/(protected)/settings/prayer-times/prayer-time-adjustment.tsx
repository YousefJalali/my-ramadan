import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import WithNetwork from '@/components/WithNetwork'
import { prayerTimes$, settings$ } from '@/store'
import { Prayer } from '@/types'
import { formatTime } from '@/utils/formatTime'
import { use$ } from '@legendapp/state/react'
import { MinusCircle, PlusCircle } from 'lucide-react-native'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PRAYERS: Array<keyof typeof Prayer> = [
  'Imsak',
  'Fajr',
  'Sunrise',
  'Dhuhr',
  'Asr',
  'Maghrib',
  'Sunset',
  'Isha',
  'Midnight',
]

export default function PrayerTimeAdjustment() {
  const [localOffset, setLocalOffset] = useState([
    ...settings$.prayerTimes.offset.get(),
  ])
  const { t } = useTranslation()

  const prayerTimes = use$(() =>
    prayerTimes$.getDayParsedPrayerTimes(DateTime.now().day)
  )

  function decrementTime(prayer: keyof typeof Prayer) {
    const idx = indexOfPrayer(prayer)
    const updated = [...localOffset]
    updated[idx] = updated[idx] - 1
    setLocalOffset(updated)
  }

  function incrementTime(prayer: keyof typeof Prayer) {
    const idx = indexOfPrayer(prayer)
    const updated = [...localOffset]
    updated[idx] = updated[idx] + 1
    setLocalOffset(updated)
  }

  function submit() {
    settings$.prayerTimes.offset.set(localOffset)
  }

  function isDirty() {
    const offset = settings$.prayerTimes.offset.get()
    return localOffset.join() !== offset.join()
  }

  return (
    <WithNetwork>
      <VStack>
        <Text size='sm' className='text-typography-900/70 leading-relaxed mb-8'>
          {t(
            'Adjust the times of the five daily prayers in minutes to better suit your schedule.'
          )}
        </Text>

        {PRAYERS.map((prayer, i, arr) => (
          <VStack
            key={prayer}
            style={{
              display: ['Imsak', 'Sunrise', 'Sunset', 'Midnight'].includes(
                prayer
              )
                ? 'none'
                : undefined,
            }}
          >
            <HStack className='flex-1 items-center justify-between' space='4xl'>
              <HStack className='items-center flex-1 justify-between'>
                <Text size='lg'>{t(prayer)}</Text>
                <Text size='lg' className='!font-arabicHeading '>
                  {formatTime(prayerTimes[prayer])}
                </Text>
              </HStack>
              <HStack className='items-center'>
                <Button
                  variant='link'
                  size='xl'
                  onPress={() => decrementTime(prayer)}
                >
                  <ButtonIcon as={MinusCircle} className='w-8 h-8' />
                </Button>
                <Text
                  size='lg'
                  className='w-16 !text-center !font-arabicHeading'
                >
                  {(localOffset[i] <= 0 ? '' : '+') + localOffset[i]}
                </Text>
                <Button
                  variant='link'
                  size='xl'
                  onPress={() => incrementTime(prayer)}
                >
                  <ButtonIcon as={PlusCircle} className='w-8 h-8' />
                </Button>
              </HStack>
            </HStack>
            {i === arr.length - 2 ? null : (
              <Divider className='my-4 bg-background-100' />
            )}
          </VStack>
        ))}

        <Button
          className='mt-8 disabled:bg-background-200'
          onPress={submit}
          disabled={!isDirty()}
        >
          <ButtonText>{t('save')}</ButtonText>
        </Button>
      </VStack>
    </WithNetwork>
  )
}

function indexOfPrayer(prayer: keyof typeof Prayer) {
  return PRAYERS.indexOf(prayer)
}
