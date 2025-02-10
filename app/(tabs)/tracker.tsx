import { Image, StyleSheet, Platform, View } from 'react-native'
import DaySelector from '@/components/DaySelector'
import DailyPrayers from '@/components/Prayers'
import { useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { IconSymbol } from '@/components/ui/IconSymbol'

export default function TrackerScreen() {
  const [selectedDay, setSelectedDay] = useState(1)

  function selectDayHandler(day: number) {
    setSelectedDay(day)
  }

  return (
    <ParallaxScrollView
      // headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color='#808080'
          name='chevron.left.forwardslash.chevron.right'
          style={styles.headerImage}
        />
      }
    >
      <DaySelector day={selectedDay} onSelectDay={selectDayHandler} />
      <View style={styles.dailyTasks}>
        <DailyPrayers day={selectedDay} />
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  dailyTasks: {
    paddingHorizontal: 24,
    gap: 32,
  },
})
