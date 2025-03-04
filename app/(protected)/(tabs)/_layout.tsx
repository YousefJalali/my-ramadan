import { Tabs } from 'expo-router'
import { Platform } from 'react-native'
import { HapticTab } from '@/components/HapticTab'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Icon } from '@/components/ui/icon'
import { Activity, House, Settings } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import useColors from '@/hooks/useColors'

export default function TabLayout() {
  const { t } = useTranslation()

  const colors = useColors()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: `rgb(${colors['--color-primary-600']})`,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,

        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            // direction: language === 'ar-SA' ? 'rtl' : 'ltr',
          },
          default: {
            backgroundColor: `rgb(${colors['--color-background-50']})`,
          },

          // default: {
          //   direction: language === 'ar-SA' ? 'rtl' : 'ltr',
          // },
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: t('Home'),
          tabBarIcon: ({ color }) => (
            <Icon as={House} size='xl' color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='tracker'
        options={{
          title: t('Tracker'),
          tabBarIcon: ({ color }) => (
            <Icon as={Activity} size='xl' color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: t('Settings'),
          tabBarIcon: ({ color }) => (
            <Icon as={Settings} size='xl' color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
