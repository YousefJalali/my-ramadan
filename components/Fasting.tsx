import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { Progress, ProgressFilledTrack } from '@/components/ui/progress'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from '@/components/ui/checkbox'
import { CheckIcon } from 'lucide-react-native'
import { useFastingCountdown } from '@/hooks/useCountdown'
import { formatCountdown } from '@/utils/formatCountdown'
import { useTranslation } from 'react-i18next'
import { formatTime } from '@/utils/formatTime'
import { use$ } from '@legendapp/state/react'
import { progress$, prayerTimes$ } from '@/store'
import { cn } from '@/utils/cn'
import StatusBadge from './StatusBadge'

export default function Fasting({
  day,
  trackerView = false,
  readOnly = false,
}: {
  day: number
  trackerView?: boolean
  readOnly?: boolean
}) {
  const { Maghrib, Imsak } = use$(() =>
    prayerTimes$.getDayParsedPrayerTimes(day)
  )
  const { fasting } = use$(progress$.days[day])

  const {
    t,
    i18n: { language },
  } = useTranslation()

  const { hours, minutes, progress } = useFastingCountdown(day)

  return (
    <VStack
      className={`bg-background-100 p-4 rounded-2xl ${cn(
        trackerView,
        'bg-background-50 p-0'
      )}`}
    >
      {/* Fasting Stats */}
      {trackerView ? null : progress$.fastingStreak(day) < 2 ? null : (
        <VStack space='md' className='mb-4'>
          <Text size='sm' className='text-typography-600'>
            🌙{' '}
            <Text bold size='sm'>
              {progress$.fastingStreak(day)}
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
            onChange={() => progress$.days[day].fasting.set(!fasting)}
          >
            <CheckboxIndicator className='rounded-full border-2 border-background-300 h-8 w-8'>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>
        )}
      </HStack>

      {trackerView ? null : (
        <>
          <Box className='mt-2'>
            <Progress
              value={fasting ? progress * 2 : 0}
              size='lg'
              className='bg-background-200'
            >
              <ProgressFilledTrack className='bg-success-400' />
            </Progress>

            <HStack className='justify-between mt-1'>
              <Text size='sm' className='text-typography-500'>
                {t('imsak')} | {formatTime(Imsak)}
              </Text>
              {progress > 0 && progress < 100 ? (
                <Text size='sm'>
                  {formatCountdown(hours, minutes, language)}
                </Text>
              ) : null}

              <Text size='sm' className='text-typography-500'>
                {formatTime(Maghrib)} | {t('Iftar')}
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
