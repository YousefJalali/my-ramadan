import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { useRef } from 'react'

type Props = {
  day: number
  onSelectDay: (day: number) => void
}

export default function DaySelector({ day, onSelectDay }: Props) {
  const daysContainerRef = useRef<ScrollView>(null)

  function selectDayHandler(day: number) {
    daysContainerRef.current?.scrollTo({ x: day * 48 - 48 })
    onSelectDay(day)
  }

  return (
    <ThemedView>
      <ThemedText style={styles.dateText}>
        {new Date().toDateString()}
      </ThemedText>

      <ScrollView
        horizontal={true}
        style={styles.dayList}
        ref={daysContainerRef}
      >
        {new Array(31).fill(0).map((n, i) => (
          <Pressable
            key={i}
            style={[
              styles.dayBtn,
              {
                backgroundColor: day === i + 1 ? 'white' : 'transparent',
              },
            ]}
            onPress={() => selectDayHandler(i + 1)}
          >
            <ThemedText
              style={[
                styles.dayBtnText,
                { color: day === i + 1 ? 'black' : 'white' },
              ]}
            >
              {i + 1}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  dateText: {
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  dayList: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  dayBtn: {
    marginRight: 8,
    width: 48,
    height: 48,
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
})
