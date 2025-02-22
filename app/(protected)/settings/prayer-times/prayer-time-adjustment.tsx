import { Button, ButtonIcon } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { MinusCircle, PlusCircle } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

export default function PrayerTimeAdjustment() {
  const { t } = useTranslation()
  const { offset } = use$(settings$.prayerTimes)

  function decrementTime(prayerIndex: number) {
    settings$.prayerTimes.offset[prayerIndex].set(offset[prayerIndex] - 1)
  }

  function incrementTime(prayerIndex: number) {
    settings$.prayerTimes.offset[prayerIndex].set(offset[prayerIndex] + 1)
  }

  return (
    <VStack space='lg'>
      <Text size='sm' className='text-neutral-900/70 leading-relaxed mb-2'>
        Adjust the times of the five daily prayers in minutes to better suit
        your schedule. Fine-tune each prayer's time using the increment and
        decrement buttons for personalized customization.
      </Text>

      {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer, i) => (
        <HStack key={prayer} className='flex-1 items-center justify-between'>
          <Text size='lg'>{t(prayer)}</Text>
          <HStack className='items-center'>
            <Button variant='link' size='xl' onPress={() => decrementTime(i)}>
              <ButtonIcon as={MinusCircle} className='w-8 h-8' />
            </Button>
            <Text size='lg' className='w-16 text-center'>
              {offset[i]}
            </Text>
            <Button variant='link' size='xl' onPress={() => incrementTime(i)}>
              <ButtonIcon as={PlusCircle} className='w-8 h-8' />
            </Button>
          </HStack>
        </HStack>
      ))}
    </VStack>
  )
}
