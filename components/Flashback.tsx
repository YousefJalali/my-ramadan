import {
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  Dimensions,
} from 'react-native'
import flashback from '@/constants/flashback'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { Link } from 'expo-router'
import { ExternalLink } from './ExternalLink'
// import * as Crypto from 'expo-crypto'

const WIDTH = Dimensions.get('screen').width - 48

export default function Flashback({ day }: { day: number }) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>On This Day</ThemedText>
      <ScrollView horizontal style={styles.list}>
        {flashback[day - 1].map((f) => (
          <ThemedView
            key={f.id}
            style={[
              styles.item,
              { width: flashback[day - 1].length > 1 ? WIDTH * 0.9 : WIDTH },
            ]}
          >
            <ThemedText type='subtitle'>{f.title}</ThemedText>
            <ThemedView>
              <ThemedText numberOfLines={2} ellipsizeMode='tail'>
                {f.description}
              </ThemedText>
              <ExternalLink href='/'>Read More</ExternalLink>
            </ThemedView>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
  },
  title: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 24,
    paddingRight: 12,
  },
  item: {
    marginRight: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
})
