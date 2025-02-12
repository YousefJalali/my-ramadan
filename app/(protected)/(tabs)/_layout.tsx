import { Tabs } from 'expo-router'
import { Platform } from 'react-native'
import { HapticTab } from '@/components/HapticTab'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Icon } from '@/components/ui/icon'
import { Activity, House, Settings } from 'lucide-react-native'
import { colors } from '@/components/ui/gluestack-ui-provider/config'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: `rgb(${colors.light['--color-primary-600']})`,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon as={House} size='xl' color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='tracker'
        options={{
          title: 'Tracker',
          tabBarIcon: ({ color }) => (
            <Icon as={Activity} size='xl' color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Icon as={Settings} size='xl' color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
