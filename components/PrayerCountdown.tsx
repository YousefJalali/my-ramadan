import { useTranslation } from 'react-i18next'
import { Text } from '@/components/ui/text'
import { useNextPrayerCountdown } from '@/hooks/useCountdown'
import { HStack } from '@/components/ui/hstack'
import { formatCountdown } from '@/utils/formatCountdown'
import { findNextPrayer } from '@/utils/findNextPrayer'
import { ParsedPrayerTimes } from '@/types'

export default function PrayerCountdown({
  prayerTimes,
}: {
  prayerTimes: ParsedPrayerTimes
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const nextPrayer = findNextPrayer(prayerTimes)

  const { hours, minutes, seconds } = useNextPrayerCountdown(
    prayerTimes[nextPrayer]
  )

  return hours + minutes + seconds === 0 ? null : (
    <HStack space='xs' className='mt-3'>
      <Text>{t('Next prayer in')}</Text>
      <Text>
        {`${formatCountdown(hours, minutes, language)} (${t(nextPrayer)})`}
      </Text>
    </HStack>
  )
}
