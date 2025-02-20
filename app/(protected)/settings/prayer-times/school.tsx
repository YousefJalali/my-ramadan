import RadioCheckList, { RadioCheckItem } from '@/components/RadioCheckList'
import { RadioGroup } from '@/components/ui/radio'
import { PRAYER_SETTINGS, toList } from '@/constants/prayerTimesSettings'
import { settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'

const { SCHOOL } = PRAYER_SETTINGS

const list = toList<RadioCheckItem[]>(SCHOOL)

export default function School() {
  const { school } = use$(settings$.prayerTimes)

  const changeHandler = async (v: string) => {
    settings$.prayerTimes.school.set(+v)
  }

  return (
    <RadioGroup
      value={school.toString()}
      onChange={changeHandler}
      className='w-full flex-1'
    >
      <RadioCheckList list={list} />
    </RadioGroup>
  )
}
