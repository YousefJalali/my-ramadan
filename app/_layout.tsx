import { useFonts } from 'expo-font'
import { Stack, useNavigationContainerRef } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import 'react-native-reanimated'
import '../global.css'
import '@/i18n'
import { useTranslation } from 'react-i18next'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colorMode$, settings$ } from '@/store'
import { getLocale } from '@/utils/getLocale'
import { use$ } from '@legendapp/state/react'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import useColors from '@/hooks/useColors'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import CheckNetwork from '@/components/CheckConnection'
import * as Sentry from '@sentry/react-native'
import { isRunningInExpoGo } from 'expo'

//sentry
// Construct a new integration instance. This is needed to communicate between the integration and React
const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
})
Sentry.init({
  dsn: 'https://4f622d47f1dc6da0dc0416e77ff5ad5b@o4509006271479808.ingest.de.sentry.io/4509006275346512',
  integrations: [navigationIntegration],
  enableNativeFramesTracking: !isRunningInExpoGo(), // Tracks slow and frozen frames in the application
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('../assets/fonts/Inter-VariableFont_opsz_wght.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Bold.ttf'),
    Rubik: require('../assets/fonts/Rubik-VariableFont_wght.ttf'),
    Beiruti: require('../assets/fonts/Beiruti-VariableFont_wght.ttf'),
  })

  const {
    i18n: { language },
  } = useTranslation()

  const colorMode = use$(colorMode$)
  const colors = useColors()

  const ref = useNavigationContainerRef()

  useEffect(() => {
    if (ref?.current) {
      navigationIntegration.registerNavigationContainer(ref)
    }
  }, [ref])

  //set local
  useEffect(() => {
    if (!settings$.language.peek()) {
      settings$.language.set(getLocale())
    }
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (error) {
    console.error(error)
  }

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
    <ThemeProvider
      value={
        colorMode === 'dark'
          ? {
              ...DarkTheme,
              colors: {
                ...DarkTheme.colors,
                background: `rgb(${colors['--color-background-50']})`,
              },
            }
          : DefaultTheme
      }
    >
      <GluestackUIProvider mode={colorMode}>
        <KeyboardProvider>
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
        </KeyboardProvider>
        <StatusBar style='auto' />
        <CheckNetwork />
      </GluestackUIProvider>
    </ThemeProvider>
  )
}

export default Sentry.wrap(RootLayout)
