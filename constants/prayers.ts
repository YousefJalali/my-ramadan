import { ExtendedPrayer } from '@/types'

export const PRAYERS: { [key in ExtendedPrayer]: boolean } = {
  Fajr: true,
  Dhuhr: true,
  Asr: true,
  Maghrib: true,
  Isha: true,
  Firstthird: false,
  Imsak: false,
  Lastthird: false,
  Midnight: false,
  Sunrise: false,
  Sunset: false,
}
