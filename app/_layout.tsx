import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import 'react-native-reanimated'
import '../global.css'
import '@/i18n'
import { useTranslation } from 'react-i18next'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Cairo: require('../assets/fonts/Cairo-VariableFont_wght.ttf'),
    Rubik: require('../assets/fonts/Rubik-VariableFont_wght.ttf'),
  })
  const {
    i18n: { language },
  } = useTranslation()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const options: NativeStackNavigationOptions = {
    headerShown: false,
    contentStyle: {
      direction: language === 'ar-SA' ? 'rtl' : 'ltr',
    },
  }

  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen
          name='(auth)'
          options={{
            ...options,
            animation:
              language === 'ar-SA' ? 'slide_from_left' : 'slide_from_right',
          }}
        />
        <Stack.Screen name='(protected)' options={options} />
        <Stack.Screen name='+not-found' />
      </Stack>

      <StatusBar style='auto' />
    </GluestackUIProvider>
  )
}
