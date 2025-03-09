import { useTranslation } from 'react-i18next'
import { Text } from '@/components/ui/text'
import useCountdown from '@/hooks/useCountdown'
import { HStack } from '@/components/ui/hstack'
import { formatCountdown } from '@/utils/formatCountdown'
import { ExtendedPrayer, ParsedPrayerTimes } from '@/types'
import { PRAYERS } from '@/constants/prayers'
import { DateTime } from 'luxon'

function getNextPrayer(prayers: {
  [key in ExtendedPrayer]: DateTime<true> | DateTime<false>
}): ExtendedPrayer {
  const today = new Date()

  for (let prayer in prayers) {
    const prayerKey = prayer as ExtendedPrayer

    if (PRAYERS[prayerKey]) {
      const prayerDate = prayers[prayerKey].toMillis()

      if (today.getTime() < prayerDate) return prayerKey
    }
  }

  return 'Fajr' as ExtendedPrayer
}

export default function PrayerCountdown({
  prayerTimes,
}: {
  prayerTimes: ParsedPrayerTimes
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const nextPrayer = getNextPrayer(prayerTimes)

  const { hours, minutes, seconds } = useCountdown(
    prayerTimes[nextPrayer].toJSDate()
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
