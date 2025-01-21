import { StyleSheet, ScrollView } from 'react-native'
import { useState } from 'react'

import { HelloWave } from '@/components/HelloWave'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import Progress from '@/components/Progress'
import Flashback from '@/components/Flashback'
import DaySelector from '@/components/DaySelector'
import Checklist from '@/components/Checklist'

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(1)

  function selectDayHandler(day: number) {
    setSelectedDay(day)
  }

  // function transformTasks() {
  //   const transformed = {}

  //   Object.entries(checklist).forEach(([day, tasks]) => {
  //     transformed[day] = tasks.map((task) => ({
  //       id: Crypto.randomUUID(),
  //       task,
  //       isChecked: false,
  //     }))
  //   })

  //   console.log(transformed)
  // }

  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Hello</ThemedText>
        <HelloWave />
      </ThemedView>

      <DaySelector day={selectedDay} onSelectDay={selectDayHandler} />

      <Flashback day={selectedDay} />

      <Progress day={selectedDay} />

      <Checklist day={selectedDay} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 24,
  },
})
