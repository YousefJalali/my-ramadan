import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import GoBackBtn from '@/components/GoBackBtn'
import { session$, settings$, todaysPrayerTimes$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import { getLocation } from '@/utils/getLocation'
import { constructUrl, fetchPrayerTimes } from '@/utils/fetchPrayerTimes'
import {
  getCachedPrayerTimes,
  setupPrayerTimesDB,
} from '@/sqlite/prayerTimesDB'
import { PrayerTimes } from '@/types'

export default function ProtectedLayout() {
  const {
    language,
    location,
    prayerTimes: {
      method,
      shafaq,
      timezonestring,
      latitudeAdjustmentMethod,
      midnightMode,
      offset,
      calendarMethod,
      school,
    },
  } = use$(settings$)

  //auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        session$.set(session)
      } else {
        session$.set(null)
      }
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        session$.set(session)
      } else {
        session$.set(null)
      }
    })
  }, [])

  //set location
  useEffect(() => {
    async function setLocation() {
      const { location, error, region } = await getLocation()

      if (!error && region?.country && region?.city && location) {
        settings$.location.set({
          country: region.country,
          city: region.city,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        })
      } else {
        //set location to Mecca
        settings$.location.set({
          country: 'SA',
          city: 'Mecca',
          longitude: 39.82563,
          latitude: 21.42664,
        })
      }
    }

    if (!location) {
      setLocation()
    }
  }, [])

  useEffect(() => {
    setupPrayerTimesDB()
    console.log('location changed')
    if (!location?.longitude || !location.latitude) return

    const url = constructUrl({
      latitude: location.latitude,
      longitude: location.longitude,
      method,
      shafaq,
      tune: offset.join(','),
      latitudeAdjustmentMethod,
      school,
      midnightMode,
      timezonestring,
      calendarMethod,
    })

    getPrayerTimes(url)
  }, [location])

  async function getPrayerTimes(url: string) {
    try {
      let data = null
      let obj: { [day: string]: PrayerTimes } = {}

      data = await getCachedPrayerTimes(url)

      if (data?.length) {
        console.log('fetched from cache')

        data.forEach((dayPrayers) => {
          const key = (+dayPrayers.hijriDate.split('-')[0]).toString()
          obj[key] = {
            ...dayPrayers,
            timings: JSON.parse(dayPrayers.timings),
            offset: JSON.parse(dayPrayers.offset),
          }
        })

        todaysPrayerTimes$.set(obj)
      } else {
        data = await fetchPrayerTimes(url)
        if (typeof data !== 'string') {
          data.forEach((dayPrayers) => {
            const { timings, date, meta } = dayPrayers
            const key = (+date.hijri.date.split('-')[0]).toString()
            obj[key] = {
              id: `${url}-${date.hijri.date}`,
              url: url,
              timings: timings,
              hijriDate: date.hijri.date,
              gregorianDate: date.gregorian.date,
              latitude: meta.latitude,
              longitude: meta.longitude,
              method: meta.method.id,
              latitudeAdjustmentMethod: meta.latitudeAdjustmentMethod,
              midnightMode: meta.midnightMode,
              school: meta.school,
              offset: meta.offset,
            }
          })
        } else {
          //set prayer times settings to math with url
        }
      }
    } catch (error) {
      console.error('Error fetching prayer times from db:', error)
    }
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: `rgb(${colors.light['--color-neutral-50']})`,
        },
        title: '',
        headerLeft: () => (language === 'ar-SA' ? undefined : <GoBackBtn />),
        headerRight: () => (language === 'ar-SA' ? <GoBackBtn /> : undefined),
        animation:
          language === 'ar-SA' ? 'slide_from_left' : 'slide_from_right',
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='on-this-day/[title]' />
      <Stack.Screen name='settings' />
    </Stack>
  )
}
