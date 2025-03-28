import { ExtendedPrayer, ParsedPrayerTimes } from '@/types/types'
import { DateTime } from 'luxon'
import { PRAYERS } from '@/constants/prayers'

export function findNextPrayer(prayers: ParsedPrayerTimes): ExtendedPrayer {
  const now = DateTime.fromISO(new Date().toISOString())

  for (let prayer in prayers) {
    const prayerKey = prayer as ExtendedPrayer

    if (PRAYERS[prayerKey] && now.toMillis() < prayers[prayerKey].toMillis()) {
      return prayerKey
    }
  }

  return 'Fajr'
}
