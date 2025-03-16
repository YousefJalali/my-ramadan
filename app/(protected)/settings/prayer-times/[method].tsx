import RadioCheckList, { RadioCheckItem } from '@/components/RadioCheckList'
import { RadioGroup } from '@/components/ui/radio'
import WithNetwork from '@/components/WithNetwork'
import { PRAYER_TIME_METHODS, toList } from '@/constants/prayerTimeCalculation'
import { PrayerTimeSettingsKeys, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { Redirect, useLocalSearchParams } from 'expo-router'

const methodName: { [key: string]: PrayerTimeSettingsKeys } = {
  'calculation-method': 'method',
  school: 'school',
  'midnight-mode': 'midnightMode',
  'latitude-adjustment-method': 'latitudeAdjustmentMethod',
  'calendar-method': 'calendarMethod',
}

export default function TimeCalculationMethod() {
  const { method: param } = useLocalSearchParams()

  if (typeof param !== 'string') {
    return <Redirect href='/(protected)/settings/prayer-times' />
  }

  const method = methodName[param]

  if (!method) {
    return <Redirect href='/(protected)/settings/prayer-times' />
  }

  const list = toList<RadioCheckItem[]>(PRAYER_TIME_METHODS[method])

  const storedMethod = use$(settings$.prayerTimes[method])

  const changeHandler = async (v: string) => {
    let value: string | number = v

    if (method !== 'calendarMethod') value = +v //number
    settings$.prayerTimes[method].set(value)
  }

  return (
    <WithNetwork>
      <RadioGroup
        value={(storedMethod || 0).toString()}
        onChange={changeHandler}
        className='w-full flex-1'
      >
        <RadioCheckList list={list} />
      </RadioGroup>
    </WithNetwork>
  )
}
