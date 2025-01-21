import { ScrollView, View, StyleSheet } from 'react-native'
import { ThemedView } from './ThemedView'
import Checkbox from 'expo-checkbox'
import { ThemedText } from './ThemedText'
import { useEffect, useState } from 'react'
import checklist from '../constants/checklist.json'

type Props = {
  day: number
}

type Tasks = {
  [key: string]: {
    id: string
    task: string
    isChecked: boolean
  }[]
}

export default function Checklist({ day }: Props) {
  const [tasks, setTasks] = useState<Tasks>({})

  useEffect(() => {
    setTasks(checklist)
  }, [])

  function checkTask(taskId: string) {
    setTasks((tasks) => {
      return {
        ...tasks,
        [day]: tasks[day].map((task) =>
          task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
        ),
      }
    })
  }

  return (
    <ThemedView>
      <ThemedText>Tasks</ThemedText>

      {Object.keys(tasks).length && (
        <ScrollView>
          {tasks[day].map((task, i) => (
            <View key={task.id} style={styles.task}>
              <Checkbox
                style={styles.checkbox}
                value={task.isChecked}
                onValueChange={() => checkTask(task.id)}
                color={task.isChecked ? '#4630EB' : 'transparent'}
              />
              <ThemedText
                style={{
                  textDecorationLine: task.isChecked
                    ? 'line-through'
                    : undefined,
                  opacity: task.isChecked ? 0.6 : 1,
                }}
              >
                {task.task}
              </ThemedText>
            </View>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  checklist: {
    flex: 1,
  },
  task: {
    fontSize: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 1000,
    backgroundColor: 'transparent',
  },
})
