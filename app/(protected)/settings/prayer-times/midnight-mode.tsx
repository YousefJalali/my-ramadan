import RadioCheckList, { RadioCheckItem } from '@/components/RadioCheckList'
import { RadioGroup } from '@/components/ui/radio'
import { PRAYER_SETTINGS, toList } from '@/constants/prayerTimesSettings'
import { settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'

const { MIDNIGHT_MODE } = PRAYER_SETTINGS

const list = toList<RadioCheckItem[]>(MIDNIGHT_MODE)

export default function MidnightMode() {
  const { midnightMode } = use$(settings$.prayerTimes)

  const changeHandler = async (v: string) => {
    settings$.prayerTimes.midnightMode.set(+v)
  }

  return (
    <RadioGroup
      value={midnightMode.toString()}
      onChange={changeHandler}
      className='w-full flex-1'
    >
      <RadioCheckList list={list} />
    </RadioGroup>
  )
}
