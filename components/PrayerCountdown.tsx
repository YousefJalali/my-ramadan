import { useTranslation } from 'react-i18next'
import { Text } from './ui/text'
import useCountdown from '@/hooks/useCountdown'
import { HStack } from './ui/hstack'
import { formatCountdown } from '@/utils/formatCountdown'
import { use$ } from '@legendapp/state/react'
import { prayerTimes$ } from '@/store'
import { ExtendedPrayer } from '@/types'
import { parsePrayerTime } from '@/utils/parsePrayerTime'
import { PRAYERS } from '@/constants/prayers'

function getNextPrayer(prayers: {
  [key in ExtendedPrayer]: string
}): ExtendedPrayer {
  const today = new Date()

  for (let prayer in prayers) {
    const prayerKey = prayer as ExtendedPrayer

    if (PRAYERS[prayerKey]) {
      const prayerDate = parsePrayerTime(prayers[prayerKey])

      if (today.getTime() < prayerDate.getTime()) return prayerKey
    }
  }

  return 'Fajr' as ExtendedPrayer
}

export default function PrayerCountdown({ day }: { day: number }) {
  const prayers = use$(prayerTimes$.timings[day])

  const {
    t,
    i18n: { language },
  } = useTranslation()

  const nextPrayer = getNextPrayer(prayers)

  const { hours, minutes, seconds } = useCountdown(
    parsePrayerTime(prayers[nextPrayer])
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
