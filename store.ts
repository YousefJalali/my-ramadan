import { observable } from '@legendapp/state'
import { Session } from '@supabase/supabase-js'
import { StoredPrayerTimes } from './types'
import { syncObservable } from '@legendapp/state/sync'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import QURAN_JUZ from '@/data/quran_juz.json'

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
  id: 'https://api.aladhan.com/v1/hijriCalendar/1446/9?latitude=25.1973654&longitude=51.4537109&method=3&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&school=0&midnightMode=0&calendarMethod=HJCoSA-23-09-1446',
  latitude: 25.1973654,
  latitudeAdjustmentMethod: 'ANGLE_BASED',
  longitude: 51.4537109,
  method: 3,
  midnightMode: 'STANDARD',
  offset: {
    Asr: 0,
    Dhuhr: 0,
    Fajr: 0,
    Imsak: 0,
    Isha: 0,
    Maghrib: 0,
    Midnight: 0,
    Sunrise: 0,
    Sunset: 0,
  },
  school: 'STANDARD',
  timings: {
    '1': {
      Asr: '15:06 (+03)',
      Dhuhr: '11:46 (+03)',
      Fajr: '04:41 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:31 (+03)',
      Isha: '18:48 (+03)',
      Lastthird: '01:50 (+03)',
      Maghrib: '17:36 (+03)',
      Midnight: '23:47 (+03)',
      Sunrise: '05:57 (+03)',
      Sunset: '17:36 (+03)',
    },
    '10': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:44 (+03)',
      Fajr: '04:33 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:23 (+03)',
      Isha: '18:52 (+03)',
      Lastthird: '01:46 (+03)',
      Maghrib: '17:41 (+03)',
      Midnight: '23:45 (+03)',
      Sunrise: '05:48 (+03)',
      Sunset: '17:41 (+03)',
    },
    '11': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:44 (+03)',
      Fajr: '04:32 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:22 (+03)',
      Isha: '18:53 (+03)',
      Lastthird: '01:45 (+03)',
      Maghrib: '17:41 (+03)',
      Midnight: '23:44 (+03)',
      Sunrise: '05:47 (+03)',
      Sunset: '17:41 (+03)',
    },
    '12': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:44 (+03)',
      Fajr: '04:30 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:20 (+03)',
      Isha: '18:53 (+03)',
      Lastthird: '01:45 (+03)',
      Maghrib: '17:42 (+03)',
      Midnight: '23:44 (+03)',
      Sunrise: '05:46 (+03)',
      Sunset: '17:42 (+03)',
    },
    '13': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:44 (+03)',
      Fajr: '04:29 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:19 (+03)',
      Isha: '18:54 (+03)',
      Lastthird: '01:44 (+03)',
      Maghrib: '17:42 (+03)',
      Midnight: '23:44 (+03)',
      Sunrise: '05:45 (+03)',
      Sunset: '17:42 (+03)',
    },
    '14': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:43 (+03)',
      Fajr: '04:28 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:18 (+03)',
      Isha: '18:54 (+03)',
      Lastthird: '01:44 (+03)',
      Maghrib: '17:43 (+03)',
      Midnight: '23:44 (+03)',
      Sunrise: '05:44 (+03)',
      Sunset: '17:43 (+03)',
    },
    '15': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:43 (+03)',
      Fajr: '04:27 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:17 (+03)',
      Isha: '18:55 (+03)',
      Lastthird: '01:43 (+03)',
      Maghrib: '17:43 (+03)',
      Midnight: '23:43 (+03)',
      Sunrise: '05:43 (+03)',
      Sunset: '17:43 (+03)',
    },
    '16': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:43 (+03)',
      Fajr: '04:26 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:16 (+03)',
      Isha: '18:55 (+03)',
      Lastthird: '01:43 (+03)',
      Maghrib: '17:44 (+03)',
      Midnight: '23:43 (+03)',
      Sunrise: '05:42 (+03)',
      Sunset: '17:44 (+03)',
    },
    '17': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:42 (+03)',
      Fajr: '04:25 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:15 (+03)',
      Isha: '18:56 (+03)',
      Lastthird: '01:42 (+03)',
      Maghrib: '17:44 (+03)',
      Midnight: '23:43 (+03)',
      Sunrise: '05:41 (+03)',
      Sunset: '17:44 (+03)',
    },
    '18': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:42 (+03)',
      Fajr: '04:24 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:14 (+03)',
      Isha: '18:56 (+03)',
      Lastthird: '01:42 (+03)',
      Maghrib: '17:45 (+03)',
      Midnight: '23:42 (+03)',
      Sunrise: '05:40 (+03)',
      Sunset: '17:45 (+03)',
    },
    '19': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:42 (+03)',
      Fajr: '04:23 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:13 (+03)',
      Isha: '18:57 (+03)',
      Lastthird: '01:41 (+03)',
      Maghrib: '17:45 (+03)',
      Midnight: '23:42 (+03)',
      Sunrise: '05:39 (+03)',
      Sunset: '17:45 (+03)',
    },
    '2': {
      Asr: '15:06 (+03)',
      Dhuhr: '11:46 (+03)',
      Fajr: '04:40 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:30 (+03)',
      Isha: '18:48 (+03)',
      Lastthird: '01:50 (+03)',
      Maghrib: '17:37 (+03)',
      Midnight: '23:46 (+03)',
      Sunrise: '05:56 (+03)',
      Sunset: '17:37 (+03)',
    },
    '20': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:42 (+03)',
      Fajr: '04:22 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:12 (+03)',
      Isha: '18:57 (+03)',
      Lastthird: '01:41 (+03)',
      Maghrib: '17:45 (+03)',
      Midnight: '23:42 (+03)',
      Sunrise: '05:38 (+03)',
      Sunset: '17:45 (+03)',
    },
    '21': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:41 (+03)',
      Fajr: '04:21 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:11 (+03)',
      Isha: '18:58 (+03)',
      Lastthird: '01:40 (+03)',
      Maghrib: '17:46 (+03)',
      Midnight: '23:42 (+03)',
      Sunrise: '05:37 (+03)',
      Sunset: '17:46 (+03)',
    },
    '22': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:41 (+03)',
      Fajr: '04:20 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:10 (+03)',
      Isha: '18:58 (+03)',
      Lastthird: '01:40 (+03)',
      Maghrib: '17:46 (+03)',
      Midnight: '23:41 (+03)',
      Sunrise: '05:36 (+03)',
      Sunset: '17:46 (+03)',
    },
    '23': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:41 (+03)',
      Fajr: '04:19 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:09 (+03)',
      Isha: '18:59 (+03)',
      Lastthird: '01:39 (+03)',
      Maghrib: '17:47 (+03)',
      Midnight: '23:41 (+03)',
      Sunrise: '05:35 (+03)',
      Sunset: '17:47 (+03)',
    },
    '24': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:40 (+03)',
      Fajr: '04:18 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:08 (+03)',
      Isha: '18:59 (+03)',
      Lastthird: '01:38 (+03)',
      Maghrib: '17:47 (+03)',
      Midnight: '23:41 (+03)',
      Sunrise: '05:34 (+03)',
      Sunset: '17:47 (+03)',
    },
    '25': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:40 (+03)',
      Fajr: '04:17 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:07 (+03)',
      Isha: '19:00 (+03)',
      Lastthird: '01:38 (+03)',
      Maghrib: '17:48 (+03)',
      Midnight: '23:40 (+03)',
      Sunrise: '05:33 (+03)',
      Sunset: '17:48 (+03)',
    },
    '26': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:40 (+03)',
      Fajr: '04:15 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:05 (+03)',
      Isha: '19:00 (+03)',
      Lastthird: '01:37 (+03)',
      Maghrib: '17:48 (+03)',
      Midnight: '23:40 (+03)',
      Sunrise: '05:32 (+03)',
      Sunset: '17:48 (+03)',
    },
    '27': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:40 (+03)',
      Fajr: '04:14 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:04 (+03)',
      Isha: '19:01 (+03)',
      Lastthird: '01:37 (+03)',
      Maghrib: '17:48 (+03)',
      Midnight: '23:40 (+03)',
      Sunrise: '05:31 (+03)',
      Sunset: '17:48 (+03)',
    },
    '28': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:39 (+03)',
      Fajr: '04:13 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:03 (+03)',
      Isha: '19:01 (+03)',
      Lastthird: '01:36 (+03)',
      Maghrib: '17:49 (+03)',
      Midnight: '23:39 (+03)',
      Sunrise: '05:30 (+03)',
      Sunset: '17:49 (+03)',
    },
    '29': {
      Asr: '15:06 (+03)',
      Dhuhr: '11:39 (+03)',
      Fajr: '04:12 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:02 (+03)',
      Isha: '19:02 (+03)',
      Lastthird: '01:36 (+03)',
      Maghrib: '17:49 (+03)',
      Midnight: '23:39 (+03)',
      Sunrise: '05:29 (+03)',
      Sunset: '17:49 (+03)',
    },
    '3': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:46 (+03)',
      Fajr: '04:39 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:29 (+03)',
      Isha: '18:49 (+03)',
      Lastthird: '01:49 (+03)',
      Maghrib: '17:37 (+03)',
      Midnight: '23:46 (+03)',
      Sunrise: '05:55 (+03)',
      Sunset: '17:37 (+03)',
    },
    '4': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:46 (+03)',
      Fajr: '04:38 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:28 (+03)',
      Isha: '18:49 (+03)',
      Lastthird: '01:49 (+03)',
      Maghrib: '17:38 (+03)',
      Midnight: '23:46 (+03)',
      Sunrise: '05:54 (+03)',
      Sunset: '17:38 (+03)',
    },
    '5': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:46 (+03)',
      Fajr: '04:37 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:27 (+03)',
      Isha: '18:50 (+03)',
      Lastthird: '01:48 (+03)',
      Maghrib: '17:38 (+03)',
      Midnight: '23:46 (+03)',
      Sunrise: '05:53 (+03)',
      Sunset: '17:38 (+03)',
    },
    '6': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:45 (+03)',
      Fajr: '04:36 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:26 (+03)',
      Isha: '18:50 (+03)',
      Lastthird: '01:48 (+03)',
      Maghrib: '17:39 (+03)',
      Midnight: '23:46 (+03)',
      Sunrise: '05:52 (+03)',
      Sunset: '17:39 (+03)',
    },
    '7': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:45 (+03)',
      Fajr: '04:35 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:25 (+03)',
      Isha: '18:51 (+03)',
      Lastthird: '01:47 (+03)',
      Maghrib: '17:39 (+03)',
      Midnight: '23:45 (+03)',
      Sunrise: '05:51 (+03)',
      Sunset: '17:39 (+03)',
    },
    '8': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:45 (+03)',
      Fajr: '04:34 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:24 (+03)',
      Isha: '18:51 (+03)',
      Lastthird: '01:47 (+03)',
      Maghrib: '17:40 (+03)',
      Midnight: '23:45 (+03)',
      Sunrise: '05:50 (+03)',
      Sunset: '17:40 (+03)',
    },
    '9': {
      Asr: '15:07 (+03)',
      Dhuhr: '11:45 (+03)',
      Fajr: '04:34 (+03)',
      Firstthird: '21:43 (+03)',
      Imsak: '04:24 (+03)',
      Isha: '18:52 (+03)',
      Lastthird: '01:46 (+03)',
      Maghrib: '17:40 (+03)',
      Midnight: '23:45 (+03)',
      Sunrise: '05:49 (+03)',
      Sunset: '17:40 (+03)',
    },
  },
  url: 'https://api.aladhan.com/v1/hijriCalendar/1446/9?latitude=25.1973654&longitude=51.4537109&method=3&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&school=0&midnightMode=0&calendarMethod=HJCoSA',
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
