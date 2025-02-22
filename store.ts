import { observable } from '@legendapp/state'
import { Session } from '@supabase/supabase-js'
import * as Localization from 'expo-localization'
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const session$ = observable<Session | null>(null)

// configureObservablePersistence({
//   pluginLocal: ObservablePersistAsyncStorage,
//   localOptions: {
//       asyncStorage: {
//           AsyncStorage
//       }
//   }
// })

const getNormalizedLocale = () => {
  const locale = Localization.getLocales()[0]?.languageTag

  if (!locale) return 'en-US'

  if (locale.startsWith('en')) return 'en-US'
  if (locale.startsWith('ar')) return 'ar-SA'

  return locale
}

export type Notification = {
  prayers: boolean
  azkar: boolean
  quranReading: boolean
}

type Location = {
  city: string
  country: string
  latitude: number
  longitude: number
}

type PrayerTimeSettings = {
  isRecommendedEnabled: boolean
  method: number
  shafaq?: 'general' | 'ahmer' | 'abyad'
  latitudeAdjustmentMethod?: 1 | 2 | 3
  midnightMode: 0 | 1
  school: 0 | 1
  offset: number[] //minutes
  calendarMethod: 'HJCoSA' | 'UAQ' | 'DIYANET'
  timezonestring?: string
  lastUpdate: number
}

export type PrayerTimeSettingsKeys = keyof Pick<
  PrayerTimeSettings,
  | 'method'
  | 'latitudeAdjustmentMethod'
  | 'midnightMode'
  | 'school'
  | 'calendarMethod'
>

export const settings$ = observable({
  language: getNormalizedLocale(),
  location: null as Location | null,
  notifications: {
    prayers: true,
    azkar: true,
    quranReading: true,
  } as Notification,
  prayerTimes: {
    isRecommendedEnabled: true,
    method: 3,
    shafaq: 'general',
    latitudeAdjustmentMethod: undefined,
    midnightMode: 0,
    school: 0,
    offset: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    calendarMethod: 'HJCoSA',
    timezonestring: 'UTC',
    lastUpdate: +new Date(),
  } as PrayerTimeSettings,
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
