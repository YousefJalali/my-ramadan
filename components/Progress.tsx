import Rings from './Rings'
import { Text } from '@/components/ui/text'
import { VStack } from './ui/vstack'
import { HStack } from './ui/hstack'
import Section from './Section'

type Props = {
  data: {
    prayers: number[]
    quran: number[]
    azkar: number[]
  }
}

export default function Progress({
  data: { prayers = [0, 5], quran = [0, 20], azkar = [0, 10] },
}: Props) {
  const data: { [key: string]: number[] } = {
    Prayers: prayers,
    'Quran Reading': quran,
    Azkar: azkar,
  }

  return (
    <Section title='Daily Progress'>
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
