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

type Progress = {
  days: {
    [day: string]: {
      fasting: boolean
      prayers: boolean[]
      quranReading: boolean
    }
  }
  dailyProgress: (dayIndex: number) => number
  totalProgress: () => {
    fasting: number
    prayers: number
    quranReading: number
  }
}
export const progress$ = observable({
  days: {
    '1': {
      fasting: true,
      prayers: [false, true, false, false, true],
      quranReading: false,
    },
    '2': {
      fasting: true,
      prayers: [true, false, false, true, false],
      quranReading: false,
    },
    '3': {
      fasting: true,
      prayers: [false, false, true, true, true],
      quranReading: true,
    },
    '4': {
      fasting: true,
      prayers: [false, true, true, true, false],
      quranReading: false,
    },
    '5': {
      fasting: false,
      prayers: [true, false, true, true, false],
      quranReading: true,
    },
    '6': {
      fasting: false,
      prayers: [false, false, false, false, false],
      quranReading: false,
    },
    '7': {
      fasting: false,
      prayers: [true, false, true, true, false],
      quranReading: false,
    },
    '8': {
      fasting: true,
      prayers: [false, false, false, false, false],
      quranReading: false,
    },
    '9': {
      fasting: false,
      prayers: [false, false, false, false, false],
      quranReading: false,
    },
    '10': {
      fasting: false,
      prayers: [true, false, false, false, false],
      quranReading: false,
    },
    '11': {
      fasting: true,
      prayers: [true, true, true, true, false],
      quranReading: false,
    },
    '12': {
      fasting: true,
      prayers: [true, true, true, false, true],
      quranReading: true,
    },
    '13': {
      fasting: false,
      prayers: [true, false, false, false, true],
      quranReading: true,
    },
    '14': {
      fasting: false,
      prayers: [true, true, false, true, false],
      quranReading: true,
    },
    '15': {
      fasting: false,
      prayers: [true, true, true, true, false],
      quranReading: true,
    },
    '16': {
      fasting: true,
      prayers: [true, true, true, false, true],
      quranReading: true,
    },
    '17': {
      fasting: true,
      prayers: [true, true, true, true, true],
      quranReading: true,
    },
    '18': {
      fasting: true,
      prayers: [true, false, true, false, true],
      quranReading: true,
    },
    '19': {
      fasting: false,
      prayers: [true, false, false, true, true],
      quranReading: false,
    },

    '20': {
      fasting: false,
      prayers: [true, false, false, true, false],
      quranReading: false,
    },
    '21': {
      fasting: true,
      prayers: [true, false, true, true, false],
      quranReading: true,
    },
    '22': {
      fasting: true,
      prayers: [false, true, false, false, false],
      quranReading: true,
    },
    '23': {
      fasting: true,
      prayers: [false, false, false, false, false],
      quranReading: false,
    },
    '24': {
      fasting: false,
      prayers: [false, false, true, false, true],
      quranReading: false,
    },
    '25': {
      fasting: false,
      prayers: [true, false, true, false, false],
      quranReading: false,
    },
    '26': {
      fasting: true,
      prayers: [false, true, false, false, true],
      quranReading: true,
    },
    '27': {
      fasting: true,
      prayers: [true, true, true, true, true],
      quranReading: true,
    },
    '28': {
      fasting: false,
      prayers: [true, false, false, false, false],
      quranReading: true,
    },
    '29': {
      fasting: false,
      prayers: [false, false, false, true, false],
      quranReading: false,
    },

    '30': {
      fasting: false,
      prayers: [true, false, false, false, false],
      quranReading: true,
    },
  },
  dailyProgress: (dayIndex: number) => {
    const day = progress$.days.get()[dayIndex + 1] || {}
    const fasting = day.fasting ? 1 : 0
    const prayers = day.prayers ? day.prayers.filter((p) => p).length : 0
    const quranReading = day.quranReading ? 1 : 0
    return ((fasting + prayers + quranReading) * 100) / 7
  },
  totalProgress: () => {
    const monthData = progress$.days.get() || {}
    let fasting = 0
    let prayers = 0
    let quranReading = 0

    Object.values(monthData).forEach((day) => {
      fasting += day.fasting ? 1 : 0
      quranReading += day.quranReading ? 1 : 0
      prayers += day.prayers.filter((p) => p).length
    })

    return {
      fasting,
      prayers,
      quranReading,
    }
  },
} as Progress)
