import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import GoBackBtn from '@/components/GoBackBtn'
import { session$, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import { getLocation } from '@/utils/getLocation'
import { constructUrl, fetchPrayerTimes } from '@/utils/fetchPrayerTimes'
import {
  getCachedPrayerTimes,
  setupPrayerTimesDB,
} from '@/sqlite/prayerTimesDB'

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
      school,
      midnightMode,
      timezonestring,
      calendarMethod,
    })

    //https://api.aladhan.com/v1/hijriCalendar/1446/7?latitude=25.1974498&longitude=51.4537486&method=3&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&school=0&midnightMode=0&timezonestring=UTC&calendarMethod=HJCoSA
    //https://api.aladhan.com/v1/hijriCalendar/1446/7?latitude=25.1974498&longitude=51.4537486&method=3&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&school=0&midnightMode=0&timezonestring=UTC&calendarMethod=HJCoSA

    getPrayerTimes(url)

    // getPrayerTimes(location.longitude, location.latitude, {})
  }, [location])

  async function getPrayerTimes(url: string) {
    try {
      let data = null
      const res = await getCachedPrayerTimes(url)
      if (res?.length === 0) {
        data = await fetchPrayerTimes(url)
      } else {
        data = res
      }
    } catch (error) {
      console.error('Error fetching prayer times from db:', error)
    } finally {
      // setLoading(false)
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
