import { Slot, Stack } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import GoBackBtn from '@/components/GoBackBtn'
import { Platform } from 'react-native'
import { session$ } from '@/store'

export default function ProtectedLayout() {
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
