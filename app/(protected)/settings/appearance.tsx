import { RadioGroup } from '@/components/ui/radio'
import { colorMode$ } from '@/store'
import RadioCheckList, { RadioCheckItem } from '@/components/RadioCheckList'
import { use$ } from '@legendapp/state/react'

const l: RadioCheckItem[] = [
  {
    value: 'light',
    label: 'light',
  },
  {
    value: 'dark',
    label: 'dark',
  },
]

export default function Appearance() {
  const mode = use$(colorMode$)

  return (
    <RadioGroup
      value={mode}
      onChange={(v) => colorMode$.set(v)}
      className='w-full flex-1'
    >
      <RadioCheckList list={l} />
    </RadioGroup>
  )
}
