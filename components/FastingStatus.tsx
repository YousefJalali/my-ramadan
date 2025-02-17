import { Box } from './ui/box'
import { VStack } from './ui/vstack'
import { Text } from './ui/text'
import { HStack } from './ui/hstack'
import { Progress, ProgressFilledTrack } from '@/components/ui/progress'
import { useState } from 'react'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from '@/components/ui/checkbox'
import { CheckIcon } from 'lucide-react-native'
import useCountdown from '@/hooks/useCountdown'
import prayerTime from '@/constants/prayerTime'
import { formatCountdown } from '@/utils/formatCountdown'
import { useTranslation } from 'react-i18next'
import { formatTime } from '@/utils/formatTime'

export default function FastingStatus({ day }: { day: number }) {
  const [fastConfirmed, setFastConfirmed] = useState(false)

  const {
    t,
    i18n: { language },
  } = useTranslation()

  //change now to prayer date
  const now = new Date()
  const d = new Date(prayerTime[day][3].time)
  d.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())

  const { hours, minutes } = useCountdown(d)

  const progress =
    ((hours * 60 + minutes) * 100) / (d.getHours() * 60 + d.getMinutes())

  return (
    <VStack className='bg-neutral-100 p-4 rounded-2xl'>
      {/* Fasting Stats */}
      <VStack space='md'>
        <Text size='sm' className='text-neutral-600'>
          🎯{' '}
          <Text bold size='sm'>
            14/30
          </Text>{' '}
          {t('fasts completed')}{' '}
        </Text>
        <Text size='sm' className='text-neutral-600'>
          🔥{' '}
          <Text bold size='sm'>
            7
          </Text>{' '}
          {t('days streak')}
        </Text>
      </VStack>

      {/* Confirmation Button */}
      <HStack space='md' className='mt-4 items-center flex-1 justify-between'>
        <Text size='xl'>
          {hours + minutes === 0
            ? t('did you fast today?')
            : t('are you fasting today?')}
        </Text>

        <Checkbox
          value='false'
          size='md'
          isInvalid={false}
          isDisabled={false}
          isChecked={fastConfirmed}
          onChange={setFastConfirmed}
        >
          <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
        </Checkbox>
      </HStack>

      {/* Progress Bar */}
      <Box className='mt-2'>
        <Progress
          value={fastConfirmed ? 100 - progress : 0}
          size='lg'
          className='bg-neutral-200'
        >
          <ProgressFilledTrack className='bg-success-400' />
        </Progress>

        <HStack className='justify-between mt-1'>
          <Text size='sm' className='text-neutral-500'>
            {t('Suhur')} | {formatTime(prayerTime[day][0].time)}
          </Text>
          {hours + minutes > 0 ? (
            <Text size='sm'>
              {formatCountdown(hours, minutes, language)} left
            </Text>
          ) : null}
          <Text size='sm' className='text-neutral-500'>
            {formatTime(prayerTime[day][3].time)} | {t('Iftar')}
          </Text>
        </HStack>
      </Box>

      {/* Motivational Message */}
      <Text
        bold
        className={`text-sm mt-4 ${fastConfirmed ? 'text-success-600' : ''}`}
      >
        {fastConfirmed
          ? t('🏆 Great job! Keep it up! 💪')
          : t('Stay consistent! You got this! 🚀')}
      </Text>
    </VStack>
  )
}
