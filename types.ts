const country = {
  id: 1,
  name: 'Afghanistan',
  iso3: 'AFG',
  iso2: 'AF',
  numeric_code: '004',
  phonecode: '93',
  capital: 'Kabul',
  currency: 'AFN',
  currency_name: 'Afghan afghani',
  currency_symbol: '؋',
  tld: '.af',
  native: 'افغانستان',
  region: 'Asia',
  region_id: 3,
  subregion: 'Southern Asia',
  subregion_id: 14,
  nationality: 'Afghan',
  timezones: [
    {
      zoneName: 'Asia/Kabul',
      gmtOffset: 16200,
      gmtOffsetName: 'UTC+04:30',
      abbreviation: 'AFT',
      tzName: 'Afghanistan Time',
    },
  ],
  translations: {
    ko: '아프가니스탄',
    'pt-BR': 'Afeganistão',
    pt: 'Afeganistão',
    nl: 'Afghanistan',
    hr: 'Afganistan',
    fa: 'افغانستان',
    de: 'Afghanistan',
    es: 'Afganistán',
    fr: 'Afghanistan',
    ja: 'アフガニスタン',
    it: 'Afghanistan',
    'zh-CN': '阿富汗',
    tr: 'Afganistan',
    ru: 'Афганистан',
    uk: 'Афганістан',
    pl: 'Afganistan',
  },
  latitude: '33.00000000',
  longitude: '65.00000000',
  emoji: '🇦🇫',
  emojiU: 'U+1F1E6 U+1F1EB',
}

const city = {
  id: 52,
  name: 'Ashkāsham',
  state_id: 3901,
  state_code: 'BDS',
  state_name: 'Badakhshan',
  country_id: 1,
  country_code: 'AF',
  country_name: 'Afghanistan',
  latitude: '36.68333000',
  longitude: '71.53333000',
  wikiDataId: 'Q4805192',
}

const prayerTimes = {
  timings: {
    Fajr: '06:06 (UTC)',
    Sunrise: '08:11 (UTC)',
    Dhuhr: '12:11 (UTC)',
    Asr: '13:54 (UTC)',
    Sunset: '16:03 (UTC)',
    Maghrib: '16:02 (UTC)',
    Isha: '18:07 (UTC)',
    Imsak: '05:58 (UTC)',
    Midnight: '23:58 (UTC)',
    Firstthird: '21:24 (UTC)',
    Lastthird: '02:45 (UTC)',
  },
  date: {
    readable: '01 Jan 2025',
    timestamp: '1735722061',
    gregorian: {
      date: '01-01-2025',
      format: 'DD-MM-YYYY',
      day: '01',
      weekday: {
        en: 'Wednesday',
      },
      month: {
        number: 1,
        en: 'January',
      },
      year: '2025',
      designation: {
        abbreviated: 'AD',
        expanded: 'Anno Domini',
      },
      lunarSighting: false,
    },
    hijri: {
      date: '01-07-1446',
      format: 'DD-MM-YYYY',
      day: '1',
      weekday: {
        en: "Al Arba'a",
        ar: 'الاربعاء',
      },
      month: {
        number: 7,
        en: 'Rajab',
        ar: 'رَجَب',
        days: 30,
      },
      year: '1446',
      designation: {
        abbreviated: 'AH',
        expanded: 'Anno Hegirae',
      },
      holidays: ['Beginning of the holy months'],
      adjustedHolidays: [],
      method: 'UAQ',
    },
  },
  meta: {
    latitude: 51.5194682,
    longitude: -0.1360365,
    timezone: 'UTC',
    method: {
      id: 3,
      name: 'Muslim World League',
      params: {
        Fajr: 18,
        Isha: 17,
      },
      location: {
        latitude: 51.5194682,
        longitude: -0.1360365,
      },
    },
    latitudeAdjustmentMethod: 'ANGLE_BASED',
    midnightMode: 'STANDARD',
    school: 'STANDARD',
    offset: {
      Imsak: '5',
      Fajr: '3',
      Sunrise: '5',
      Dhuhr: '7',
      Asr: '9',
      Maghrib: '-1',
      Sunset: 0,
      Isha: '8',
      Midnight: '-6',
    },
  },
}

enum Prayer {
  Imsak = 'Imsak',
  Fajr = 'Fajr',
  Sunrise = 'Sunrise',
  Dhuhr = 'Dhuhr',
  Asr = 'Asr',
  Sunset = 'Sunset',
  Maghrib = 'Maghrib',
  Isha = 'Isha',
  Midnight = 'Midnight',
}
export type ExtendedPrayer = Prayer | 'Firstthird' | 'Lastthird'

type PrayerTimes = {
  id: string
  url: string
  hijriMonth: number
  gregorianMonth: number
  latitude: number
  longitude: number
  method: number
  latitudeAdjustmentMethod: string
  midnightMode: string
  school: string
  offset: { [key in Prayer]: number }
}

export type StoredPrayerTimes = PrayerTimes & {
  timings: { [day: string]: { [key in ExtendedPrayer]: string } }
  offset: { [key in Prayer]: number }
}

export type CachedPrayerTimes = PrayerTimes & {
  hijriDay: number
  gregorianDay: number
  hijriDate: string
  gregorianDate: string
  timings: string
  offset: string
}

export type Country = typeof country
export type City = typeof city
export type PrayerTimesAPIResponse = typeof apiRes
const apiRes = [
  {
    timings: {
      Fajr: '01:41 (UTC)',
      Sunrise: '02:57 (UTC)',
      Dhuhr: '08:46 (UTC)',
      Asr: '12:06 (UTC)',
      Sunset: '14:36 (UTC)',
      Maghrib: '14:36 (UTC)',
      Isha: '15:48 (UTC)',
      Imsak: '01:31 (UTC)',
      Midnight: '20:47 (UTC)',
      Firstthird: '18:43 (UTC)',
      Lastthird: '22:50 (UTC)',
    },
    date: {
      readable: '01 Mar 2025',
      timestamp: '1740819661',
      gregorian: {
        date: '01-03-2025',
        format: 'DD-MM-YYYY',
        day: '01',
        weekday: {
          en: 'Saturday',
        },
        month: {
          number: 3,
          en: 'March',
        },
        year: '2025',
        designation: {
          abbreviated: 'AD',
          expanded: 'Anno Domini',
        },
        lunarSighting: false,
      },
      hijri: {
        date: '01-09-1446',
        format: 'DD-MM-YYYY',
        day: '1',
        weekday: {
          en: 'Al Sabt',
          ar: 'السبت',
        },
        month: {
          number: 9,
          en: 'Ramaḍān',
          ar: 'رَمَضان',
          days: 29,
        },
        year: '1446',
        designation: {
          abbreviated: 'AH',
          expanded: 'Anno Hegirae',
        },
        holidays: ['1st Day of Ramadan'],
        adjustedHolidays: [],
        method: 'HJCoSA',
      },
    },
    meta: {
      latitude: 25.1974498,
      longitude: 51.4537486,
      timezone: 'UTC',
      method: {
        id: 3,
        name: 'Muslim World League',
        params: {
          Fajr: 18,
          Isha: 17,
        },
        location: {
          latitude: 51.5194682,
          longitude: -0.1360365,
        },
      },
      latitudeAdjustmentMethod: 'ANGLE_BASED',
      midnightMode: 'STANDARD',
      school: 'STANDARD',
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
    },
  },
]
