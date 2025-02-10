import { ramadanQuranReading } from '@/constants/quranReading'
import { Heading } from './ui/heading'
import { HStack } from './ui/hstack'
import { VStack } from './ui/vstack'
import { Text } from './ui/text'
import { Divider } from './ui/divider'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from '@/components/ui/checkbox'
import { CheckIcon } from '@/components/ui/icon'
import { BookOpen } from 'lucide-react-native'
import Section from './Section'

export default function QuranReading({ day }: { day: number }) {
  //@ts-ignore
  const q = ramadanQuranReading[day]

  return (
    <Section title='Quran Reading' icon={BookOpen}>
      <VStack className='bg-neutral-100 p-3 rounded-2xl'>
        <Text className='text-neutral-600'>{q.description}</Text>
        <Divider className='my-2 bg-neutral-200' />
        <HStack className='space-between w-full'>
          <VStack className='flex-1'>
            <Text bold size='lg'>
              {q.surah}
            </Text>
            <Text size='sm'>
              Page {q.pageFrom} to {q.pageTo} ({q.hizb})
            </Text>
          </VStack>

          <Checkbox
            value='false'
            size='md'
            isInvalid={false}
            isDisabled={false}
          >
            <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>
        </HStack>
      </VStack>
    </Section>
  )
}
