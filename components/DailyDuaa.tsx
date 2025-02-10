import dailyDuaa from '@/constants/dailyDuaa'
import { Center } from './ui/center'
import { Text } from './ui/text'
import { VStack } from './ui/vstack'
import { Heading } from './ui/heading'
import Section from './Section'
import { Sprout } from 'lucide-react-native'

type Props = {
  day: number
}

export default function DailyDuaa({ day }: Props) {
  return (
    <Section title='Daily Duaa' icon={Sprout}>
      <Center className='bg-neutral-100 rounded-2xl p-4'>
        <Text>{dailyDuaa[day]}</Text>
      </Center>
    </Section>
  )
}
