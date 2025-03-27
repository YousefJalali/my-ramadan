import { getCachedPrayerTimes, insertPrayerTimes } from '@/sqlite/prayerTimesDB'
import {
  CachedPrayerTimes,
  PrayerTimesAPIResponse,
  StoredPrayerTimes,
} from '@/types'
import Bugsnag from '@bugsnag/expo'

export async function getPrayerTimes(url: string) {
  try {
    let obj: StoredPrayerTimes

    const res = await getCachedPrayerTimes(url)

    if (res?.length) {
      console.log('prayer times fetched from cache')

      const data: CachedPrayerTimes[] = res

      obj = {
        ...data[0],
        offset: JSON.parse(data[0].offset),
        timings: {},
      }

      data.forEach((dayPrayers) => {
        obj.timings[dayPrayers.hijriDay] = JSON.parse(dayPrayers.timings)
      })

      return obj
    } else {
      const data = await fetchPrayerTimes(url)

      if (typeof data !== 'string') {
        const { date, meta } = data[0]
        obj = {
          id: `${url}-${date.hijri.date}`,
          url: url,
          hijriMonth: date.hijri.month.number,
          gregorianMonth: date.gregorian.month.number,
          latitude: meta.latitude,
          longitude: meta.longitude,
          method: meta.method.id,
          latitudeAdjustmentMethod: meta.latitudeAdjustmentMethod,
          midnightMode: meta.midnightMode,
          school: meta.school,
          offset: meta.offset,
          timings: {},
          timezone: meta.timezone,
        }

        data.forEach((dayPrayers) => {
          const { timings, date, meta } = dayPrayers

          obj.timings[date.hijri.day] = timings
        })

        return obj
      } else {
        //set prayer times settings to math with url
      }
    }
    // console.log(prayerTimes$.timings.get())
  } catch (error) {
    Bugsnag.notify(error as Error)
    console.error('Error fetching prayer times from db:', error)
  }
}

const fetchPrayerTimes = async (
  url: string,
  retryCount = 3
): Promise<PrayerTimesAPIResponse | string> => {
  try {
    console.log('fetching prayerTimes from API')

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch prayer times')
    }

    const { data }: { data: PrayerTimesAPIResponse } = await response.json()

    insertPrayerTimes(url, data)

    return data
  } catch (error) {
    if (retryCount > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds before retrying
      return fetchPrayerTimes(url, retryCount - 1)
    }
    console.error(error)
    Bugsnag.notify(error as Error)
    return 'Failed to load prayer times. Please try again.'
  }
}
