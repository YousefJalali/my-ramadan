import { ramadanQuranReading } from '@/constants/quranReading'
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
import { useTranslation } from 'react-i18next'

export default function QuranReading({ day }: { day: number }) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  //@ts-ignore
  const q = ramadanQuranReading[language][day]

  return (
    <VStack className='bg-neutral-100 p-3 rounded-2xl'>
      <Text className='text-neutral-600'>{q.description}</Text>
      <Divider className='my-2 bg-neutral-200' />
      <HStack className='space-between w-full'>
        <VStack className='flex-1'>
          <Text bold size='lg'>
            {q.surah}
          </Text>
          <Text size='sm'>
            {t('Page')} {q.pageFrom} {t('to')} {q.pageTo} ({q.hizb})
          </Text>
        </VStack>

        <Checkbox value='false' size='md' isInvalid={false} isDisabled={false}>
          <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
        </Checkbox>
      </HStack>
    </VStack>
  )
}
