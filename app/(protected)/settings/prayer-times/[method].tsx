import RadioCheckList, { RadioCheckItem } from '@/components/RadioCheckList'
import { RadioGroup } from '@/components/ui/radio'
import { PRAYER_TIME_METHODS, toList } from '@/constants/prayerTimeCalculation'
import { PrayerTimeMethodsKeys, settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { Redirect, useLocalSearchParams } from 'expo-router'

const methodName: { [key: string]: PrayerTimeMethodsKeys } = {
  'calculation-method': 'calculationMethod',
  school: 'school',
  'midnight-mode': 'midnightMode',
  'latitude-adjustment-method': 'latitudeAdjustmentMethod',
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

  const storedMethod = use$(settings$.prayerTimeMethods[method])

  const changeHandler = async (v: string) => {
    settings$.prayerTimeMethods[method].set(+v)
  }

  return (
    <RadioGroup
      value={(storedMethod || 0).toString()}
      onChange={changeHandler}
      className='w-full flex-1'
    >
      <RadioCheckList list={list} />
    </RadioGroup>
  )
}
