import { Image, StyleSheet, Platform } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function ChecklistScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText>ha</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
