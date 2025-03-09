import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import GoBackBtn from '@/components/GoBackBtn'
import { prayerTimes$, session$, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { getLocation } from '@/utils/getLocation'
import { constructUrl } from '@/utils/constructUrl'
import { setupPrayerTimesDB } from '@/sqlite/prayerTimesDB'
import NetInfo from '@react-native-community/netinfo'
import useColors from '@/hooks/useColors'
import { getPrayerTimes } from '@/utils/getPrayerTimes'

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

  const colors = useColors()

  //check internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log('Connection type', state.type)
      console.log('Is connected?', state.isConnected)
    })

    return () => {
      unsubscribe()
    }
  }, [])

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
        settings$.location.current.set({
          country: region.country,
          city: region.city,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        })
      } else {
        //set location to Mecca
        settings$.location.current.set({
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

  //set prayer times
  useEffect(() => {
    ;(async () => {
      await setupPrayerTimesDB()

      console.log('location changed')
      if (!location.current?.longitude || !location.current.latitude) return

      const baseUrl = 'https://api.aladhan.com/v1/hijriCalendar/1446/9'
      const url = constructUrl(baseUrl, {
        latitude: location.current.latitude,
        longitude: location.current.longitude,
        method,
        shafaq,
        tune: offset.join(','),
        latitudeAdjustmentMethod,
        school,
        midnightMode,
        timezonestring: 'UTC',
        calendarMethod,
        iso8601: 'true',
      })

      const prayerTimes = await getPrayerTimes(url)

      if (prayerTimes) prayerTimes$.set(prayerTimes)
    })()
  }, [location.current])

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: `rgb(${colors['--color-background-50']})`,
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
      <Stack.Screen name='adhkar/index' />
      <Stack.Screen name='settings' />
    </Stack>
  )
}
