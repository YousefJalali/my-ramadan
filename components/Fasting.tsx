import { Box } from './ui/box'
import { VStack } from './ui/vstack'
import { Text } from './ui/text'
import { HStack } from './ui/hstack'
import { Progress, ProgressFilledTrack } from '@/components/ui/progress'
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
import { use$ } from '@legendapp/state/react'
import { progress$ } from '@/store'
import { setToTodaysDate } from '@/utils/setToTodaysDate'
import { cn } from '@/utils/cn'
import StatusBadge from './StatusBadge'

export default function Fasting({
  dayIndex,
  trackerView = false,
  readOnly = false,
}: {
  dayIndex: number
  trackerView?: boolean
  readOnly?: boolean
}) {
  const { fasting } = use$(progress$.days[dayIndex + 1])

  const {
    t,
    i18n: { language },
  } = useTranslation()

  const prayerDate = setToTodaysDate(prayerTime[dayIndex][3].time)

  const { hours, minutes } = useCountdown(prayerDate)

  const progress =
    ((hours * 60 + minutes) * 100) /
    (prayerDate.getHours() * 60 + prayerDate.getMinutes())

  return (
    <VStack
      className={`bg-neutral-100 p-4 rounded-2xl ${cn(
        trackerView,
        'bg-neutral-50 p-0'
      )}`}
    >
      {/* Fasting Stats */}
      {trackerView ? null : (
        <VStack space='md' className='mb-4'>
          {/* <Text size='sm' className='text-neutral-600'>
            🎯{' '}
            <Text bold size='sm'>
              14/30
            </Text>{' '}
            {t('fasts completed')}{' '}
          </Text> */}
          <Text size='sm' className='text-neutral-600'>
            🎯{' '}
            <Text bold size='sm'>
              7
            </Text>{' '}
            {t('days streak')}
          </Text>
        </VStack>
      )}

      {/* Confirmation Button */}
      <HStack space='md' className='items-center flex-1 justify-between'>
        {readOnly ? (
          <Text size='xl'>
            {fasting
              ? t('you fasted this day')
              : t('you did not fast this day')}
          </Text>
        ) : (
          <Text size='xl'>
            {hours + minutes === 0
              ? t('did you fast today?')
              : t('are you fasting today?')}
          </Text>
        )}

        {readOnly ? (
          <StatusBadge isCompleted={fasting} />
        ) : (
          <Checkbox
            size='md'
            isInvalid={false}
            isDisabled={false}
            value={'' + fasting}
            isChecked={fasting}
            onChange={() => progress$.days[dayIndex + 1].fasting.set(!fasting)}
          >
            <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>
        )}
      </HStack>

      {trackerView ? null : (
        <>
          <Box className='mt-2'>
            <Progress
              value={fasting ? 100 - progress : 0}
              size='lg'
              className='bg-neutral-200'
            >
              <ProgressFilledTrack className='bg-success-400' />
            </Progress>

            <HStack className='justify-between mt-1'>
              <Text size='sm' className='text-neutral-500'>
                {t('Suhur')} | {formatTime(prayerTime[dayIndex][0].time)}
              </Text>
              {hours + minutes > 0 ? (
                <Text size='sm'>
                  {formatCountdown(hours, minutes, language)}
                </Text>
              ) : null}

              <Text size='sm' className='text-neutral-500'>
                {formatTime(prayerTime[dayIndex][3].time)} | {t('Iftar')}
              </Text>
            </HStack>
          </Box>

          <Text
            bold
            className={`text-sm mt-4 ${fasting ? 'text-success-600' : ''}`}
          >
            {fasting
              ? t('🏆 Great job! Keep it up! 💪')
              : t('Stay consistent! You got this! 🚀')}
          </Text>
        </>
      )}
    </VStack>
  )
}
