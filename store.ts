import { observable } from '@legendapp/state'
import { Session } from '@supabase/supabase-js'
import { ExtendedPrayer, StoredPrayerTimes } from './types'
import { syncObservable } from '@legendapp/state/sync'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import QURAN_JUZ from '@/data/quran_juz.json'
import { DateTime } from 'luxon'

export const colorMode$ = observable<'light' | 'dark'>('light')

export const session$ = observable<Session | null>(null)

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
  flag?: string
  iso2?: string
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
  language: 'en-US',
  location: {
    current: null as Location | null,
    history: [] as Location[],
    change: (location: Location) => {
      let history = settings$.location.history.get()

      settings$.location.current.set(location)

      history = history.filter((h) => h.city !== location.city)

      if (history.length > 4) history.pop()

      settings$.location.history.set([location, ...history])
    },
    clearHistory: () => settings$.location.history.set([]),
  },
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
    timezonestring: undefined,
    lastUpdate: +new Date(),
  } as PrayerTimeSettings,
})

//progress
type Progress = {
  days: {
    [day: string]: {
      fasting: boolean
      prayers: boolean[]
      quranReading: QuranJuz | null
    }
  }
  dailyProgress: (dayIndex: number) => number
  totalProgress: () => {
    fasting: number
    prayers: number
    quranReading: number
  }
  fastingStreak: (day: number) => number
}
export const progress$ = observable({
  days: {
    '1': {
      fasting: true,
      prayers: [false, true, false, false, true],
      quranReading: null,
    },
    '2': {
      fasting: true,
      prayers: [true, false, false, true, false],
      quranReading: null,
    },
    '3': {
      fasting: true,
      prayers: [false, false, true, true, true],
      quranReading: null,
    },
    '4': {
      fasting: true,
      prayers: [false, true, true, true, false],
      quranReading: null,
    },
    '5': {
      fasting: false,
      prayers: [true, false, true, true, false],
      quranReading: null,
    },
    '6': {
      fasting: false,
      prayers: [false, false, false, false, false],
      quranReading: null,
    },
    '7': {
      fasting: false,
      prayers: [true, false, true, true, false],
      quranReading: null,
    },
    '8': {
      fasting: true,
      prayers: [false, false, false, false, false],
      quranReading: null,
    },
    '9': {
      fasting: false,
      prayers: [false, false, false, false, false],
      quranReading: null,
    },
    '10': {
      fasting: false,
      prayers: [true, false, false, false, false],
      quranReading: null,
    },
    '11': {
      fasting: true,
      prayers: [true, true, true, true, false],
      quranReading: null,
    },
    '12': {
      fasting: true,
      prayers: [true, true, true, false, true],
      quranReading: null,
    },
    '13': {
      fasting: false,
      prayers: [true, false, false, false, true],
      quranReading: null,
    },
    '14': {
      fasting: false,
      prayers: [true, true, false, true, false],
      quranReading: null,
    },
    '15': {
      fasting: false,
      prayers: [true, true, true, true, false],
      quranReading: null,
    },
    '16': {
      fasting: true,
      prayers: [true, true, true, false, true],
      quranReading: null,
    },
    '17': {
      fasting: true,
      prayers: [true, true, true, true, true],
      quranReading: null,
    },
    '18': {
      fasting: true,
      prayers: [true, false, true, false, true],
      quranReading: null,
    },
    '19': {
      fasting: false,
      prayers: [true, false, false, true, true],
      quranReading: null,
    },

    '20': {
      fasting: false,
      prayers: [true, false, false, true, false],
      quranReading: null,
    },
    '21': {
      fasting: true,
      prayers: [true, false, true, true, false],
      quranReading: null,
    },
    '22': {
      fasting: true,
      prayers: [false, true, false, false, false],
      quranReading: null,
    },
    '23': {
      fasting: true,
      prayers: [false, false, false, false, false],
      quranReading: null,
    },
    '24': {
      fasting: false,
      prayers: [false, false, true, false, true],
      quranReading: null,
    },
    '25': {
      fasting: false,
      prayers: [true, false, true, false, false],
      quranReading: null,
    },
    '26': {
      fasting: true,
      prayers: [false, true, false, false, true],
      quranReading: null,
    },
    '27': {
      fasting: true,
      prayers: [true, true, true, true, true],
      quranReading: null,
    },
    '28': {
      fasting: false,
      prayers: [true, false, false, false, false],
      quranReading: null,
    },
    '29': {
      fasting: false,
      prayers: [false, false, false, true, false],
      quranReading: null,
    },

    '30': {
      fasting: false,
      prayers: [true, false, false, false, false],
      quranReading: null,
    },
  },
  dailyProgress: (d: number) => {
    const day = progress$.days.get()['' + d] || {}
    const fasting = day.fasting ? 1 : 0
    const prayers = day.prayers ? day.prayers.filter((p) => p).length : 0
    const quranReading = !!day.quranReading ? 1 : 0

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
  fastingStreak: (day: number) => {
    const monthFasting = progress$.days.get() || {}

    let count = 0
    for (let i = 1; i < day; i++) {
      if (monthFasting[i]?.fasting) {
        count++
      } else {
        count = 0
      }
    }

    return count + (monthFasting[day].fasting ? 1 : 0)
  },
} as Progress)

export type QuranJuz = {
  juz: string
  surah: {
    name_en: string
    name_ar: string
    verses: number[]
  }[]
}

//prayer times
export const prayerTimes$ = observable<StoredPrayerTimes>({
  gregorianMonth: 3,
  hijriMonth: 9,
  id: 'https://api.aladhan.com/v1/hijriCalendar/1446/9?latitude=25.1973654&longitude=51.4537109&method=3&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&timezonestring=UTC&calendarMethod=UAQ&iso8601=true-01-09-1446',
  latitude: 25.1973654,
  latitudeAdjustmentMethod: 'ANGLE_BASED',
  longitude: 51.4537109,
  method: 3,
  midnightMode: 'STANDARD',
  offset: {
    Imsak: 0,
    Fajr: 0,
    Sunrise: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Sunset: 0,
    Isha: 0,
    Midnight: 0,
  },
  school: 'STANDARD',
  url: 'https://api.aladhan.com/v1/hijriCalendar/1446/9?latitude=25.1973654&longitude=51.4537109&method=3&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&timezonestring=UTC&calendarMethod=UAQ&iso8601=true',
  timezone: 'UTC',
  timings: {
    '1': {
      Fajr: '2025-03-01T01:41:00+00:00',
      Sunrise: '2025-03-01T02:57:00+00:00',
      Dhuhr: '2025-03-01T08:46:00+00:00',
      Asr: '2025-03-01T12:06:00+00:00',
      Sunset: '2025-03-01T14:36:00+00:00',
      Maghrib: '2025-03-01T14:36:00+00:00',
      Isha: '2025-03-01T15:48:00+00:00',
      Imsak: '2025-03-01T01:31:00+00:00',
      Midnight: '2025-03-01T20:47:00+00:00',
      Firstthird: '2025-03-01T18:43:00+00:00',
      Lastthird: '2025-03-01T22:50:00+00:00',
    },
    '2': {
      Fajr: '2025-03-02T01:40:00+00:00',
      Sunrise: '2025-03-02T02:56:00+00:00',
      Dhuhr: '2025-03-02T08:46:00+00:00',
      Asr: '2025-03-02T12:07:00+00:00',
      Sunset: '2025-03-02T14:37:00+00:00',
      Maghrib: '2025-03-02T14:37:00+00:00',
      Isha: '2025-03-02T15:48:00+00:00',
      Imsak: '2025-03-02T01:30:00+00:00',
      Midnight: '2025-03-02T20:46:00+00:00',
      Firstthird: '2025-03-02T18:43:00+00:00',
      Lastthird: '2025-03-02T22:50:00+00:00',
    },
    '3': {
      Fajr: '2025-03-03T01:39:00+00:00',
      Sunrise: '2025-03-03T02:55:00+00:00',
      Dhuhr: '2025-03-03T08:46:00+00:00',
      Asr: '2025-03-03T12:07:00+00:00',
      Sunset: '2025-03-03T14:37:00+00:00',
      Maghrib: '2025-03-03T14:37:00+00:00',
      Isha: '2025-03-03T15:49:00+00:00',
      Imsak: '2025-03-03T01:29:00+00:00',
      Midnight: '2025-03-03T20:46:00+00:00',
      Firstthird: '2025-03-03T18:43:00+00:00',
      Lastthird: '2025-03-03T22:49:00+00:00',
    },
    '4': {
      Fajr: '2025-03-04T01:38:00+00:00',
      Sunrise: '2025-03-04T02:54:00+00:00',
      Dhuhr: '2025-03-04T08:46:00+00:00',
      Asr: '2025-03-04T12:07:00+00:00',
      Sunset: '2025-03-04T14:38:00+00:00',
      Maghrib: '2025-03-04T14:38:00+00:00',
      Isha: '2025-03-04T15:49:00+00:00',
      Imsak: '2025-03-04T01:28:00+00:00',
      Midnight: '2025-03-04T20:46:00+00:00',
      Firstthird: '2025-03-04T18:43:00+00:00',
      Lastthird: '2025-03-04T22:49:00+00:00',
    },
    '5': {
      Fajr: '2025-03-05T01:37:00+00:00',
      Sunrise: '2025-03-05T02:53:00+00:00',
      Dhuhr: '2025-03-05T08:46:00+00:00',
      Asr: '2025-03-05T12:07:00+00:00',
      Sunset: '2025-03-05T14:38:00+00:00',
      Maghrib: '2025-03-05T14:38:00+00:00',
      Isha: '2025-03-05T15:50:00+00:00',
      Imsak: '2025-03-05T01:27:00+00:00',
      Midnight: '2025-03-05T20:46:00+00:00',
      Firstthird: '2025-03-05T18:43:00+00:00',
      Lastthird: '2025-03-05T22:48:00+00:00',
    },
    '6': {
      Fajr: '2025-03-06T01:36:00+00:00',
      Sunrise: '2025-03-06T02:52:00+00:00',
      Dhuhr: '2025-03-06T08:45:00+00:00',
      Asr: '2025-03-06T12:07:00+00:00',
      Sunset: '2025-03-06T14:39:00+00:00',
      Maghrib: '2025-03-06T14:39:00+00:00',
      Isha: '2025-03-06T15:50:00+00:00',
      Imsak: '2025-03-06T01:26:00+00:00',
      Midnight: '2025-03-06T20:46:00+00:00',
      Firstthird: '2025-03-06T18:43:00+00:00',
      Lastthird: '2025-03-06T22:48:00+00:00',
    },
    '7': {
      Fajr: '2025-03-07T01:35:00+00:00',
      Sunrise: '2025-03-07T02:51:00+00:00',
      Dhuhr: '2025-03-07T08:45:00+00:00',
      Asr: '2025-03-07T12:07:00+00:00',
      Sunset: '2025-03-07T14:39:00+00:00',
      Maghrib: '2025-03-07T14:39:00+00:00',
      Isha: '2025-03-07T15:51:00+00:00',
      Imsak: '2025-03-07T01:25:00+00:00',
      Midnight: '2025-03-07T20:45:00+00:00',
      Firstthird: '2025-03-07T18:43:00+00:00',
      Lastthird: '2025-03-07T22:47:00+00:00',
    },
    '8': {
      Fajr: '2025-03-08T01:34:00+00:00',
      Sunrise: '2025-03-08T02:50:00+00:00',
      Dhuhr: '2025-03-08T08:45:00+00:00',
      Asr: '2025-03-08T12:07:00+00:00',
      Sunset: '2025-03-08T14:40:00+00:00',
      Maghrib: '2025-03-08T14:40:00+00:00',
      Isha: '2025-03-08T15:51:00+00:00',
      Imsak: '2025-03-08T01:24:00+00:00',
      Midnight: '2025-03-08T20:45:00+00:00',
      Firstthird: '2025-03-08T18:43:00+00:00',
      Lastthird: '2025-03-08T22:47:00+00:00',
    },
    '9': {
      Fajr: '2025-03-09T01:34:00+00:00',
      Sunrise: '2025-03-09T02:49:00+00:00',
      Dhuhr: '2025-03-09T08:45:00+00:00',
      Asr: '2025-03-09T12:07:00+00:00',
      Sunset: '2025-03-09T14:40:00+00:00',
      Maghrib: '2025-03-09T14:40:00+00:00',
      Isha: '2025-03-09T15:52:00+00:00',
      Imsak: '2025-03-09T01:24:00+00:00',
      Midnight: '2025-03-09T20:45:00+00:00',
      Firstthird: '2025-03-09T18:43:00+00:00',
      Lastthird: '2025-03-09T22:46:00+00:00',
    },
    '10': {
      Fajr: '2025-03-10T01:33:00+00:00',
      Sunrise: '2025-03-10T02:48:00+00:00',
      Dhuhr: '2025-03-10T08:44:00+00:00',
      Asr: '2025-03-10T12:07:00+00:00',
      Sunset: '2025-03-10T14:41:00+00:00',
      Maghrib: '2025-03-10T14:41:00+00:00',
      Isha: '2025-03-10T15:52:00+00:00',
      Imsak: '2025-03-10T01:23:00+00:00',
      Midnight: '2025-03-10T20:45:00+00:00',
      Firstthird: '2025-03-10T18:43:00+00:00',
      Lastthird: '2025-03-10T22:46:00+00:00',
    },
    '11': {
      Fajr: '2025-03-11T01:32:00+00:00',
      Sunrise: '2025-03-11T02:47:00+00:00',
      Dhuhr: '2025-03-11T08:44:00+00:00',
      Asr: '2025-03-11T12:07:00+00:00',
      Sunset: '2025-03-11T14:41:00+00:00',
      Maghrib: '2025-03-11T14:41:00+00:00',
      Isha: '2025-03-11T15:53:00+00:00',
      Imsak: '2025-03-11T01:22:00+00:00',
      Midnight: '2025-03-11T20:44:00+00:00',
      Firstthird: '2025-03-11T18:43:00+00:00',
      Lastthird: '2025-03-11T22:45:00+00:00',
    },
    '12': {
      Fajr: '2025-03-12T01:30:00+00:00',
      Sunrise: '2025-03-12T02:46:00+00:00',
      Dhuhr: '2025-03-12T08:44:00+00:00',
      Asr: '2025-03-12T12:08:00+00:00',
      Sunset: '2025-03-12T14:42:00+00:00',
      Maghrib: '2025-03-12T14:42:00+00:00',
      Isha: '2025-03-12T15:53:00+00:00',
      Imsak: '2025-03-12T01:20:00+00:00',
      Midnight: '2025-03-12T20:44:00+00:00',
      Firstthird: '2025-03-12T18:43:00+00:00',
      Lastthird: '2025-03-12T22:45:00+00:00',
    },
    '13': {
      Fajr: '2025-03-13T01:29:00+00:00',
      Sunrise: '2025-03-13T02:45:00+00:00',
      Dhuhr: '2025-03-13T08:44:00+00:00',
      Asr: '2025-03-13T12:08:00+00:00',
      Sunset: '2025-03-13T14:42:00+00:00',
      Maghrib: '2025-03-13T14:42:00+00:00',
      Isha: '2025-03-13T15:54:00+00:00',
      Imsak: '2025-03-13T01:19:00+00:00',
      Midnight: '2025-03-13T20:44:00+00:00',
      Firstthird: '2025-03-13T18:43:00+00:00',
      Lastthird: '2025-03-13T22:44:00+00:00',
    },
    '14': {
      Fajr: '2025-03-14T01:28:00+00:00',
      Sunrise: '2025-03-14T02:44:00+00:00',
      Dhuhr: '2025-03-14T08:43:00+00:00',
      Asr: '2025-03-14T12:08:00+00:00',
      Sunset: '2025-03-14T14:43:00+00:00',
      Maghrib: '2025-03-14T14:43:00+00:00',
      Isha: '2025-03-14T15:54:00+00:00',
      Imsak: '2025-03-14T01:18:00+00:00',
      Midnight: '2025-03-14T20:44:00+00:00',
      Firstthird: '2025-03-14T18:43:00+00:00',
      Lastthird: '2025-03-14T22:44:00+00:00',
    },
    '15': {
      Fajr: '2025-03-15T01:27:00+00:00',
      Sunrise: '2025-03-15T02:43:00+00:00',
      Dhuhr: '2025-03-15T08:43:00+00:00',
      Asr: '2025-03-15T12:08:00+00:00',
      Sunset: '2025-03-15T14:43:00+00:00',
      Maghrib: '2025-03-15T14:43:00+00:00',
      Isha: '2025-03-15T15:55:00+00:00',
      Imsak: '2025-03-15T01:17:00+00:00',
      Midnight: '2025-03-15T20:43:00+00:00',
      Firstthird: '2025-03-15T18:43:00+00:00',
      Lastthird: '2025-03-15T22:43:00+00:00',
    },
    '16': {
      Fajr: '2025-03-16T01:26:00+00:00',
      Sunrise: '2025-03-16T02:42:00+00:00',
      Dhuhr: '2025-03-16T08:43:00+00:00',
      Asr: '2025-03-16T12:08:00+00:00',
      Sunset: '2025-03-16T14:44:00+00:00',
      Maghrib: '2025-03-16T14:44:00+00:00',
      Isha: '2025-03-16T15:55:00+00:00',
      Imsak: '2025-03-16T01:16:00+00:00',
      Midnight: '2025-03-16T20:43:00+00:00',
      Firstthird: '2025-03-16T18:43:00+00:00',
      Lastthird: '2025-03-16T22:43:00+00:00',
    },
    '17': {
      Fajr: '2025-03-17T01:25:00+00:00',
      Sunrise: '2025-03-17T02:41:00+00:00',
      Dhuhr: '2025-03-17T08:42:00+00:00',
      Asr: '2025-03-17T12:08:00+00:00',
      Sunset: '2025-03-17T14:44:00+00:00',
      Maghrib: '2025-03-17T14:44:00+00:00',
      Isha: '2025-03-17T15:56:00+00:00',
      Imsak: '2025-03-17T01:15:00+00:00',
      Midnight: '2025-03-17T20:43:00+00:00',
      Firstthird: '2025-03-17T18:43:00+00:00',
      Lastthird: '2025-03-17T22:42:00+00:00',
    },
    '18': {
      Fajr: '2025-03-18T01:24:00+00:00',
      Sunrise: '2025-03-18T02:40:00+00:00',
      Dhuhr: '2025-03-18T08:42:00+00:00',
      Asr: '2025-03-18T12:08:00+00:00',
      Sunset: '2025-03-18T14:45:00+00:00',
      Maghrib: '2025-03-18T14:45:00+00:00',
      Isha: '2025-03-18T15:56:00+00:00',
      Imsak: '2025-03-18T01:14:00+00:00',
      Midnight: '2025-03-18T20:42:00+00:00',
      Firstthird: '2025-03-18T18:43:00+00:00',
      Lastthird: '2025-03-18T22:42:00+00:00',
    },
    '19': {
      Fajr: '2025-03-19T01:23:00+00:00',
      Sunrise: '2025-03-19T02:39:00+00:00',
      Dhuhr: '2025-03-19T08:42:00+00:00',
      Asr: '2025-03-19T12:07:00+00:00',
      Sunset: '2025-03-19T14:45:00+00:00',
      Maghrib: '2025-03-19T14:45:00+00:00',
      Isha: '2025-03-19T15:57:00+00:00',
      Imsak: '2025-03-19T01:13:00+00:00',
      Midnight: '2025-03-19T20:42:00+00:00',
      Firstthird: '2025-03-19T18:43:00+00:00',
      Lastthird: '2025-03-19T22:41:00+00:00',
    },
    '20': {
      Fajr: '2025-03-20T01:22:00+00:00',
      Sunrise: '2025-03-20T02:38:00+00:00',
      Dhuhr: '2025-03-20T08:42:00+00:00',
      Asr: '2025-03-20T12:07:00+00:00',
      Sunset: '2025-03-20T14:45:00+00:00',
      Maghrib: '2025-03-20T14:45:00+00:00',
      Isha: '2025-03-20T15:57:00+00:00',
      Imsak: '2025-03-20T01:12:00+00:00',
      Midnight: '2025-03-20T20:42:00+00:00',
      Firstthird: '2025-03-20T18:43:00+00:00',
      Lastthird: '2025-03-20T22:41:00+00:00',
    },
    '21': {
      Fajr: '2025-03-21T01:21:00+00:00',
      Sunrise: '2025-03-21T02:37:00+00:00',
      Dhuhr: '2025-03-21T08:41:00+00:00',
      Asr: '2025-03-21T12:07:00+00:00',
      Sunset: '2025-03-21T14:46:00+00:00',
      Maghrib: '2025-03-21T14:46:00+00:00',
      Isha: '2025-03-21T15:58:00+00:00',
      Imsak: '2025-03-21T01:11:00+00:00',
      Midnight: '2025-03-21T20:42:00+00:00',
      Firstthird: '2025-03-21T18:43:00+00:00',
      Lastthird: '2025-03-21T22:40:00+00:00',
    },
    '22': {
      Fajr: '2025-03-22T01:20:00+00:00',
      Sunrise: '2025-03-22T02:36:00+00:00',
      Dhuhr: '2025-03-22T08:41:00+00:00',
      Asr: '2025-03-22T12:07:00+00:00',
      Sunset: '2025-03-22T14:46:00+00:00',
      Maghrib: '2025-03-22T14:46:00+00:00',
      Isha: '2025-03-22T15:58:00+00:00',
      Imsak: '2025-03-22T01:10:00+00:00',
      Midnight: '2025-03-22T20:41:00+00:00',
      Firstthird: '2025-03-22T18:43:00+00:00',
      Lastthird: '2025-03-22T22:40:00+00:00',
    },
    '23': {
      Fajr: '2025-03-23T01:19:00+00:00',
      Sunrise: '2025-03-23T02:35:00+00:00',
      Dhuhr: '2025-03-23T08:41:00+00:00',
      Asr: '2025-03-23T12:07:00+00:00',
      Sunset: '2025-03-23T14:47:00+00:00',
      Maghrib: '2025-03-23T14:47:00+00:00',
      Isha: '2025-03-23T15:59:00+00:00',
      Imsak: '2025-03-23T01:09:00+00:00',
      Midnight: '2025-03-23T20:41:00+00:00',
      Firstthird: '2025-03-23T18:43:00+00:00',
      Lastthird: '2025-03-23T22:39:00+00:00',
    },
    '24': {
      Fajr: '2025-03-24T01:18:00+00:00',
      Sunrise: '2025-03-24T02:34:00+00:00',
      Dhuhr: '2025-03-24T08:40:00+00:00',
      Asr: '2025-03-24T12:07:00+00:00',
      Sunset: '2025-03-24T14:47:00+00:00',
      Maghrib: '2025-03-24T14:47:00+00:00',
      Isha: '2025-03-24T15:59:00+00:00',
      Imsak: '2025-03-24T01:08:00+00:00',
      Midnight: '2025-03-24T20:41:00+00:00',
      Firstthird: '2025-03-24T18:43:00+00:00',
      Lastthird: '2025-03-24T22:38:00+00:00',
    },
    '25': {
      Fajr: '2025-03-25T01:17:00+00:00',
      Sunrise: '2025-03-25T02:33:00+00:00',
      Dhuhr: '2025-03-25T08:40:00+00:00',
      Asr: '2025-03-25T12:07:00+00:00',
      Sunset: '2025-03-25T14:48:00+00:00',
      Maghrib: '2025-03-25T14:48:00+00:00',
      Isha: '2025-03-25T16:00:00+00:00',
      Imsak: '2025-03-25T01:07:00+00:00',
      Midnight: '2025-03-25T20:40:00+00:00',
      Firstthird: '2025-03-25T18:43:00+00:00',
      Lastthird: '2025-03-25T22:38:00+00:00',
    },
    '26': {
      Fajr: '2025-03-26T01:15:00+00:00',
      Sunrise: '2025-03-26T02:32:00+00:00',
      Dhuhr: '2025-03-26T08:40:00+00:00',
      Asr: '2025-03-26T12:07:00+00:00',
      Sunset: '2025-03-26T14:48:00+00:00',
      Maghrib: '2025-03-26T14:48:00+00:00',
      Isha: '2025-03-26T16:00:00+00:00',
      Imsak: '2025-03-26T01:05:00+00:00',
      Midnight: '2025-03-26T20:40:00+00:00',
      Firstthird: '2025-03-26T18:43:00+00:00',
      Lastthird: '2025-03-26T22:37:00+00:00',
    },
    '27': {
      Fajr: '2025-03-27T01:14:00+00:00',
      Sunrise: '2025-03-27T02:31:00+00:00',
      Dhuhr: '2025-03-27T08:40:00+00:00',
      Asr: '2025-03-27T12:07:00+00:00',
      Sunset: '2025-03-27T14:48:00+00:00',
      Maghrib: '2025-03-27T14:48:00+00:00',
      Isha: '2025-03-27T16:01:00+00:00',
      Imsak: '2025-03-27T01:04:00+00:00',
      Midnight: '2025-03-27T20:40:00+00:00',
      Firstthird: '2025-03-27T18:43:00+00:00',
      Lastthird: '2025-03-27T22:37:00+00:00',
    },
    '28': {
      Fajr: '2025-03-28T01:13:00+00:00',
      Sunrise: '2025-03-28T02:30:00+00:00',
      Dhuhr: '2025-03-28T08:39:00+00:00',
      Asr: '2025-03-28T12:07:00+00:00',
      Sunset: '2025-03-28T14:49:00+00:00',
      Maghrib: '2025-03-28T14:49:00+00:00',
      Isha: '2025-03-28T16:01:00+00:00',
      Imsak: '2025-03-28T01:03:00+00:00',
      Midnight: '2025-03-28T20:39:00+00:00',
      Firstthird: '2025-03-28T18:43:00+00:00',
      Lastthird: '2025-03-28T22:36:00+00:00',
    },
    '29': {
      Fajr: '2025-03-29T01:12:00+00:00',
      Sunrise: '2025-03-29T02:29:00+00:00',
      Dhuhr: '2025-03-29T08:39:00+00:00',
      Asr: '2025-03-29T12:07:00+00:00',
      Sunset: '2025-03-29T14:49:00+00:00',
      Maghrib: '2025-03-29T14:49:00+00:00',
      Isha: '2025-03-29T16:02:00+00:00',
      Imsak: '2025-03-29T01:02:00+00:00',
      Midnight: '2025-03-29T20:39:00+00:00',
      Firstthird: '2025-03-29T18:43:00+00:00',
      Lastthird: '2025-03-29T22:36:00+00:00',
    },
  },
  getDayParsedPrayerTimes: (day: number) => {
    const prayerTimes = prayerTimes$.get().timings[day]
    //@ts-ignore
    const res: { [key in ExtendedPrayer]: DateTime<true> | DateTime<false> } =
      {}

    for (let [prayer, time] of Object.entries(prayerTimes)) {
      res[prayer as ExtendedPrayer] = DateTime.fromISO(time)
    }

    return res
  },
})

export const khatmQuran$ = observable({
  lastReading: () =>
    Object.values(progress$.days.get()).findLast((d) => d.quranReading)
      ?.quranReading || null,

  nextReading: () => {
    const last = khatmQuran$.lastReading()
    // console.log('called', last)

    if (!last) {
      // console.log('here 1')
      return QURAN_JUZ[0]
    }

    let returnNextEle = false

    for (let j of QURAN_JUZ) {
      if (returnNextEle) {
        // console.log('here 2')
        return j
      }

      if (j.juz === last.juz) {
        if (j.surah.length === last.surah.length) {
          const lastIndex = j.surah.length - 1
          const defaultVerses = j.surah[lastIndex].verses
          const currentVerses = last.surah[lastIndex].verses

          if (defaultVerses[1] === currentVerses[1]) {
            //return next ele
            returnNextEle = true
          } else {
            //return same remaining verses
            // console.log('here 3')
            return {
              juz: j.juz,
              surah: [
                {
                  name_en: j.surah[lastIndex].name_en,
                  name_ar: j.surah[lastIndex].name_ar,
                  verses: [
                    defaultVerses[1] - currentVerses[1],
                    defaultVerses[1],
                  ],
                },
              ],
            }
          }
        } else {
          //missing surah
          const currentSurahs = Object.values(last.surah)
          let index = 0
          for (let def of j.surah) {
            if (!currentSurahs.find((cur) => cur.name_en === def.name_en)) {
              // console.log('here 4')
              return {
                juz: j.juz,
                surah: j.surah.slice(index),
              }
            }
            index++
          }
        }
      }
    }

    return QURAN_JUZ[QURAN_JUZ.length - 1]
  },
})

syncObservable(settings$, {
  persist: {
    name: 'settings',
    plugin: ObservablePersistMMKV,
  },
})

syncObservable(prayerTimes$, {
  persist: {
    name: 'prayerTimes',
    plugin: ObservablePersistMMKV,
  },
})

syncObservable(progress$, {
  persist: {
    name: 'progress',
    plugin: ObservablePersistMMKV,
  },
})

// const s = settings$.get()
