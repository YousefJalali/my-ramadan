import { useTranslation } from 'react-i18next'
import prayerTime from '@/constants/prayerTime'
import { Text } from './ui/text'
import useCountdown from '@/hooks/useCountdown'
import { HStack } from './ui/hstack'
import { formatCountdown } from '@/utils/formatCountdown'

function getNextPrayer(day: number) {
  const today = new Date()

  for (const prayer of prayerTime[day]) {
    const prayerDate = new Date(prayer.time)

    //change prayer date to now
    prayerDate.setFullYear(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )

    if (today.getTime() < prayerDate.getTime()) return prayer
  }

  return prayerTime[day][0]
}

export default function PrayerCountdown({ day }: { day: number }) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const nextPrayer = getNextPrayer(day)

  const { hours, minutes, seconds } = useCountdown(nextPrayer.time)

  return (
    <HStack space='xs' className='mt-3'>
      <Text>{t('Next prayer in')}</Text>
      <Text>
        {hours + minutes + seconds === 0
          ? ''
          : `${formatCountdown(hours, minutes, language)} (${t(
              nextPrayer.prayer
            )})`}
      </Text>
    </HStack>
  )
}
