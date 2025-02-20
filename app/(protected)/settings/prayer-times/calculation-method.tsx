import RadioCheckList, { RadioCheckItem } from '@/components/RadioCheckList'
import { RadioGroup } from '@/components/ui/radio'
import { PRAYER_SETTINGS, toList } from '@/constants/prayerTimesSettings'
import { settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'

const { CALCULATION_METHODS } = PRAYER_SETTINGS

const list = toList<RadioCheckItem[]>(CALCULATION_METHODS)

export default function CalculationMethod() {
  const calculationMethod = use$(settings$.prayerTimes.calculationMethod)

  const changeHandler = async (v: string) => {
    settings$.prayerTimes.calculationMethod.set(+v)
  }

  return (
    <RadioGroup
      value={calculationMethod.toString()}
      onChange={changeHandler}
      className='w-full flex-1'
    >
      <RadioCheckList list={list} />
    </RadioGroup>
  )
}
