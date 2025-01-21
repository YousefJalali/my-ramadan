import type { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from './ThemedText'
import Rings from './Rings'

type Props = PropsWithChildren<{
  day: number
}>

export default function Progress({ children, day }: Props) {
  const data: { [key: string]: number[] } = {
    total: [50, 100],
    daily: [10, 22],
    quran: [13, 60],
  }
  return (
    <ThemedView>
      <ThemedView style={styles.container}>
        <Rings total={data.total} daily={data.daily} quran={data.quran} />

        <ThemedView style={styles.label}>
          {['total', 'daily', 'quran'].map((p) => (
            <ThemedView key={p}>
              <ThemedText type='defaultSemiBold'>{p}</ThemedText>
              <ThemedText type='title'>
                {data[p][0]} / {data[p][1]}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 24,
    alignItems: 'center',
    margin: 24,
    overflow: 'hidden',
  },
  label: {
    width: '50%',
    gap: 8,
    flex: 1,
  },
})
