import Rings from './Rings'
import { Text } from '@/components/ui/text'
import { VStack } from './ui/vstack'
import { HStack } from './ui/hstack'
import { Heading } from './ui/heading'
import Section from './Section'

export default function Progress() {
  const data: { [key: string]: number[] } = {
    Prayers: [50, 150],
    'Quran Reading': [5, 60],
    Azkar: [3, 30],
  }
  return (
    <Section title='Monthly Progress'>
      <HStack className='bg-neutral-100 rounded-2xl mt-2 gap-2'>
        <Rings data={data} />

        <VStack className='gap-4 justify-center'>
          {Object.keys(data).map((p) => (
            <VStack key={p}>
              <Text className='capitalize'>{p}</Text>
              <Text bold size='xl'>
                {data[p][0]} / {data[p][1]}
              </Text>
            </VStack>
          ))}
        </VStack>
      </HStack>
    </Section>
  )
}
