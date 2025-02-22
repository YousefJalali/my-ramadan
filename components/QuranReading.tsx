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
import { use$ } from '@legendapp/state/react'
import { progress$ } from '@/store'
import { cn } from '@/utils/cn'
import StatusBadge from './StatusBadge'

export default function QuranReading({
  day,
  trackerView = false,
  readOnly = false,
}: {
  day: number
  trackerView?: boolean
  readOnly?: boolean
}) {
  const { quranReading: readingProgress } = use$(progress$.days[day])

  const {
    t,
    i18n: { language },
  } = useTranslation()

  //@ts-ignore
  const dayReading = ramadanQuranReading[language][day]

  return (
    <VStack
      className={`bg-neutral-100 p-3 rounded-2xl ${cn(
        trackerView,
        'bg-neutral-50 p-0'
      )}`}
    >
      {trackerView ? null : (
        <>
          <Text className='text-neutral-600'>{dayReading.description}</Text>
          <Divider className='my-2 bg-neutral-200' />
        </>
      )}
      <HStack
        space='sm'
        className={`space-between w-full ${cn(trackerView, 'items-start')}`}
      >
        <VStack className='flex-1'>
          <Text bold size='lg'>
            {dayReading.surah}
          </Text>
          <Text size='sm'>
            {t('Page')} {dayReading.pageFrom} {t('to')} {dayReading.pageTo} (
            {dayReading.hizb})
          </Text>
        </VStack>

        {readOnly ? (
          <StatusBadge isCompleted={readingProgress} />
        ) : (
          <Checkbox
            size='md'
            isInvalid={false}
            isDisabled={false}
            isChecked={readingProgress}
            value={'' + readingProgress}
            onChange={() =>
              progress$.days[day].quranReading.set(!readingProgress)
            }
          >
            <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>
        )}
      </HStack>
    </VStack>
  )
}
