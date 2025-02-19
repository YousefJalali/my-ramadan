import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import GoBackBtn from '@/components/GoBackBtn'
import { session$, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from '@/components/ui/gluestack-ui-provider/config'
import { getLocation } from '@/utils/getLocation'

export default function ProtectedLayout() {
  const { language, location } = use$(settings$)

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

  useEffect(() => {
    async function setLocation() {
      console.log('setLocation')
      const { location, error, region } = await getLocation()

      if (!error && region?.country && region?.city && location) {
        settings$.location.set({
          country: region.country,
          city: region.city,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        })
      }
    }

    if (!location) {
      setLocation()
    }
  }, [])

  const options: NativeStackNavigationOptions = {
    headerShown: true,
    headerBackVisible: false,
    headerStyle: {
      backgroundColor: `rgb(${colors.light['--color-neutral-50']})`,
    },
    title: '',
    headerLeft: () => (language === 'ar-SA' ? undefined : <GoBackBtn />),
    headerRight: () => (language === 'ar-SA' ? <GoBackBtn /> : undefined),
    animation: language === 'ar-SA' ? 'slide_from_left' : 'slide_from_right',
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='on-this-day/[title]' options={options} />
      <Stack.Screen name='settings' options={options} />
    </Stack>
  )
}
