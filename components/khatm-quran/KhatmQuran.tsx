import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'
import { Text } from '../ui/text'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from '@/components/ui/checkbox'
import { CheckIcon } from '@/components/ui/icon'
import { useTranslation } from 'react-i18next'
import { progress$, khatmQuran$, QuranJuz } from '@/store'
import { cn } from '@/utils/cn'
import StatusBadge from '../StatusBadge'
// import ReadingPlanForm from './form/ReadingPlanForm'
import { Computed, Memo } from '@legendapp/state/react'

function formatSurahVerses(juzObject: QuranJuz) {
  const entries = juzObject.surah.map(({ name_en, verses }) => {
    return `${name_en} (${verses.join(':')})`
  })

  if (entries.length > 1) {
    return `${entries[0]} to ${entries[entries.length - 1]}`
  }
  return entries[0] ? `${entries[0]}` : ''
}

export default function QuranReading({
  day,
  trackerView = false,
  readOnly = false,
}: {
  day: number
  trackerView?: boolean
  readOnly?: boolean
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const dayReading =
    progress$.days[day].quranReading.get() || khatmQuran$.nextReading()

  function checkHandler() {
    if (progress$.days[day].quranReading.get()) {
      console.log('uncheck')
      progress$.days[day].quranReading.set(null)
    } else {
      console.log('check')
      const next = khatmQuran$.nextReading()
      progress$.days[day].quranReading.set(next)
      // console.log(JSON.stringify(next))
    }

    // progress$.days[day].quranReading.set(
    //   readingProgress
    //     ? [dayReading.pages[0], dayReading.pages[1]]
    //     : null
    // )
  }

  return (
    <VStack
      className={`bg-neutral-100 p-3 rounded-2xl ${cn(
        trackerView,
        'bg-neutral-50 p-0'
      )}`}
    >
      {trackerView ? null : (
        <>
          <Text className='text-neutral-600' size='sm'>
            Try to finish Juz {dayReading.juz} today
          </Text>
        </>
      )}
      <HStack space='sm' className={`mt-2 space-between items-start w-full`}>
        <VStack className='flex-1 '>
          <Text bold size='xl'>
            {formatSurahVerses(dayReading)}
          </Text>
          {/* <ReadingPlanForm /> */}
        </VStack>

        <Computed>
          {() =>
            readOnly ? (
              <StatusBadge
                isCompleted={!!progress$.days[day].quranReading.get()}
              />
            ) : (
              <Checkbox
                size='md'
                isInvalid={false}
                isDisabled={false}
                isChecked={!!progress$.days[day].quranReading.get()}
                value={'' + !!progress$.days[day].quranReading.get()}
                onChange={checkHandler}
              >
                <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
              </Checkbox>
            )
          }
        </Computed>
      </HStack>
    </VStack>
  )
}
