import { getCachedPrayerTimes, insertPrayerTimes } from '@/sqlite/prayerTimesDB'
import { fetch } from 'expo/fetch'

export const fetchPrayerTimes = async (
  url: string,
  retryCount = 3
): Promise<any> => {
  try {
    console.log('fetchingPrayerTimes')

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch prayer times')
    }

    const { data } = await response.json()

    insertPrayerTimes(url, data)

    return data
  } catch (error) {
    if (retryCount > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds before retrying
      return fetchPrayerTimes(url, retryCount - 1)
    }
    console.log(error)
    return 'Failed to load prayer times. Please try again.'
  }
}

export function constructUrl(params: Record<string, any>) {
  const baseUrl = 'https://api.aladhan.com/v1/hijriCalendar/1446/7'

  // Filter out undefined values
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  )

  const queryString = new URLSearchParams(filteredParams).toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}
