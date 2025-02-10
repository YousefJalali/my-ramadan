import { ScrollView } from 'react-native'
import { Text } from '@/components/ui/text'
import { useRef } from 'react'
import { VStack } from './ui/vstack'
import { HStack } from './ui/hstack'
import { Pressable } from '@/components/ui/pressable'
import { Center } from './ui/center'

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
    <VStack className='mb-6'>
      <Text className='mb-2 mx-6'>{new Date().toDateString()}</Text>

      <ScrollView horizontal ref={daysContainerRef}>
        <HStack className='gap-2 mx-6'>
          {new Array(31).fill(0).map((n, i) => (
            <Pressable
              key={i}
              className=''
              onPress={() => selectDayHandler(i + 1)}
            >
              {({ pressed }) => (
                <Center
                  className={`h-12 w-12 rounded-full  ${
                    day === i + 1 ? 'bg-primary-500' : 'bg-neutral-100'
                  }`}
                >
                  <Text
                    className={day === i + 1 ? 'text-neutral-50 font-bold' : ''}
                  >
                    {i + 1}
                  </Text>
                </Center>
              )}
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  )
}
