import { Slot, Stack } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import GoBackBtn from '@/components/GoBackBtn'
import { session$, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'

export default function ProtectedLayout() {
  const { language } = use$(settings$)

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
      <Stack.Screen
        name='flashback/[title]'
        options={{ headerShown: true, title: '' }}
      />
      <Stack.Screen
        name='settings'
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: '',
          headerLeft: () => (language === 'ar-SA' ? undefined : <GoBackBtn />),
          headerRight: () => (language === 'ar-SA' ? <GoBackBtn /> : undefined),
          animation:
            language === 'ar-SA' ? 'slide_from_left' : 'slide_from_right',
        }}
      />
    </Stack>
  )
}
