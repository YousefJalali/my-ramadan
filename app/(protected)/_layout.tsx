import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import GoBackBtn from '@/components/GoBackBtn'
import { prayerTimes$, session$, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { getLocation } from '@/utils/getLocation'
import { constructUrl } from '@/utils/constructUrl'
import { setupPrayerTimesDB } from '@/sqlite/prayerTimesDB'
import useColors from '@/hooks/useColors'
import { getPrayerTimes } from '@/utils/getPrayerTimes'

export default function ProtectedLayout() {
  const { language, location } = use$(settings$)

  const prayerTimesUrl = use$(() => settings$.prayerTimes.url())

  const colors = useColors()

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
          country_ar: region.country,
          city: region.city,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        })
      } else {
        //set location to Mecca
        settings$.location.current.set({
          country: 'SA',
          country_ar: 'SA',
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

      const prayerTimes = await getPrayerTimes(prayerTimesUrl)

      if (prayerTimes) prayerTimes$.set(prayerTimes)
    })()
  }, [prayerTimesUrl])

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
