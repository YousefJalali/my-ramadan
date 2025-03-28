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
import { colorMode$, settings$ } from '@/stores/store'
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
import React from 'react'
import Bugsnag from '@bugsnag/expo'
import { View, Text } from 'react-native'
import { Spinner } from '@/components/ui/spinner'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

Bugsnag.start()
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)
const ErrorView = () => (
  <View>
    <Text>Inform users of an error in the component tree.</Text>
  </View>
)

export default function RootLayout() {
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
    Bugsnag.notify(error)
    return (
      <View>
        <Text>Could not load the app</Text>
      </View>
    )
  }

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Spinner
          size='large'
          color={`rgb(${colors['--color-background-500']})`}
        />
      </View>
    )
  }

  const options: NativeStackNavigationOptions = {
    headerShown: false,
    contentStyle: {
      direction: language === 'ar-SA' ? 'rtl' : 'ltr',
    },
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
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
                    language === 'ar-SA'
                      ? 'slide_from_left'
                      : 'slide_from_right',
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
    </ErrorBoundary>
  )
}
