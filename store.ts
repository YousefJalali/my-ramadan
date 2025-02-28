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
      quranReading = 1
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
    '2': {
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
    '3': {
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
  },
  url: 'https://api.aladhan.com/v1/hijriCalendar/1446/9?latitude=25.1973654&longitude=51.4537109&method=3&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&school=0&midnightMode=0&calendarMethod=HJCoSA',
})

export const khatmQuran$ = observable({
  lastReading: () =>
    Object.values(progress$.days.get()).findLast((d) => d.quranReading)
      ?.quranReading || null,

  nextReading: () => {
    const last = khatmQuran$.lastReading()
    console.log('called', last)

    if (!last) {
      console.log('here 1')
      return {
        juz: '01',
        surah: [
          {
            name_en: 'Al-Fatiha',
            name_ar: 'Al-Fatiha',
            verses: [1, 7],
          },
          {
            name_en: 'Al-Baqara',
            name_ar: 'Al-Baqara',
            verses: [1, 141],
          },
        ],
      }
    }

    let returnNextEle = false

    for (let j of QURAN_JUZ) {
      console.log('here 2')
      if (returnNextEle) return j

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
            console.log('here 3')
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
        }

        //missing surah
        const currentSurahs = Object.values(last.surah)
        let index = 0
        for (let def of j.surah) {
          if (!currentSurahs.find((cur) => cur.name_en === def.name_en)) {
            console.log('here 4')
            return {
              juz: j.juz,
              surah: j.surah.slice(index),
            }
          }
          index++
        }
      }
    }

    return {
      juz: '30',
      surah: [
        {
          name_en: 'An-Nas',
          name_ar: 'An-Nas',
          verses: [1, 6],
        },
      ],
    }
  },
})

syncObservable(settings$, {
  persist: {
    name: 'settings',
    plugin: ObservablePersistMMKV,
  },
})
