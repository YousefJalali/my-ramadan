import { Slot, Stack } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { router } from 'expo-router'
import GoBackBtn from '@/components/GoBackBtn'
import { Platform } from 'react-native'
import { store$ } from '@/store'

export default function ProtectedLayout() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(protected)/(tabs)')
      } else {
        console.log('no user')
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        store$.email.set(session.user.email ?? '')
        router.replace('/(protected)/(tabs)')
      } else {
        console.log('no user')
        router.replace('/(auth)/login')
      }
    })
  }, [])

  // return <Slot />

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='flashback/[title]' options={{ headerShown: true }} />
      <Stack.Screen
        name='settings'
        options={{
          headerShown: true,
          title: '',
          headerLeft: () => (Platform.OS === 'ios' ? <></> : undefined),
          headerRight: () => (Platform.OS === 'ios' ? <GoBackBtn /> : <></>),
          animation:
            Platform.OS === 'ios' ? 'ios_from_left' : 'slide_from_right',
        }}
      />
    </Stack>
  )
}
