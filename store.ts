import { observable } from '@legendapp/state'
import { Session } from '@supabase/supabase-js'
import * as Localization from 'expo-localization'

export const session$ = observable<Session | null>(null)

const getNormalizedLocale = () => {
  const locale = Localization.getLocales()[0]?.languageTag

  if (!locale) return 'en-US'

  if (locale.startsWith('en')) return 'en-US'
  if (locale.startsWith('ar')) return 'ar-SA'

  return locale
}

export const settings$ = observable({
  language: getNormalizedLocale(),
  notifications: {
    prayers: true,
    azkar: true,
    quran: true,
  },
})

export const progress$ = observable({
  fasting: [
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    true,
  ],
  prayers: [
    [
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
    ],
    [
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
    ],
    [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
    ],
    [
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
    ],
  ],
  quranReading: [
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
  ],
  dailyProgress: (dayIndex: number) => {
    const fasting = progress$.fasting.get()[dayIndex] ? 1 : 0
    let prayers = 0
    progress$.prayers.get().forEach((p) => {
      prayers = prayers + (p[dayIndex] ? 1 : 0)
    })
    const quranReading = progress$.quranReading.get()[dayIndex] ? 1 : 0

    return ((fasting + prayers + quranReading) * 100) / 7
  },
  totalProgress: () => {
    let total = {
      fasting: progress$.fasting.get().filter((e) => e).length,
      prayers: progress$.prayers
        .get()
        .flat()
        .filter((e) => e).length,
      quranReading: progress$.quranReading.get().filter((e) => e).length,
    }

    return total
  },
})

// fasting: [
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
// ],
// prayers: [
//   [
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//   ],
//   [
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//   ],
//   [
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//   ],
//   [
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//   ],
//   [
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//   ],
// ],
// quranReading: [
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
// ],
