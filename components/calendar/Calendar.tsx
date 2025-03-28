import { Dispatch, SetStateAction } from 'react'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { Radio, RadioGroup, RadioIndicator } from '@/components/ui/radio'
import { Center } from '@/components/ui/center'
import { Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import DayItem from './DayItem'
import { prayerTimes$ } from '@/stores/store'
import { gregorianToHijri } from '@/utils/gregorianToHijri'

const WIDTH = Dimensions.get('window').width

const gap = (WIDTH - 48 * 7) / 6

const calendarDays: { [key: string]: string[] } = {
  'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'ar-SA': [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
}

export default function Calendar({
  day,
  setDay,
}: {
  day: number
  setDay: Dispatch<SetStateAction<number>>
}) {
  const {
    i18n: { language },
  } = useTranslation()

  const todayHijri = gregorianToHijri(new Date())

  return (
    <>
      <HStack className='mb-2' style={{ columnGap: gap }}>
        {calendarDays[language].map((dayName) => (
          <Text
            size={language === 'ar-SA' ? 'xs' : 'lg'}
            className='!text-center w-12'
            key={dayName}
          >
            {dayName}
          </Text>
        ))}
      </HStack>

      <HStack>
        <RadioGroup
          className='flex-row flex-wrap'
          value={'' + day}
          onChange={setDay}
          style={{ columnGap: gap, rowGap: gap }}
        >
          <Center className='w-12' />
          <Center className='w-12' />
          <Center className='w-12' />
          <Center className='w-12' />
          <Center className='w-12' />
          <Center className='w-12' />
          {Object.keys(prayerTimes$.timings.get()).map((d) => (
            <Radio
              key={d}
              value={d.toString()}
              size='md'
              isInvalid={false}
              isDisabled={+todayHijri < +d}
            >
              <RadioIndicator className='h-12 w-12 border-0 overflow-hidden'>
                <DayItem day={day} dayInCalendar={+d} />
              </RadioIndicator>
            </Radio>
          ))}
        </RadioGroup>
      </HStack>
    </>
  )
}
