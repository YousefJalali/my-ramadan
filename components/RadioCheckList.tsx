import { VStack } from '@/components/ui/vstack'
import {
  Radio,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio'
import { Check, LucideIcon } from 'lucide-react-native'
import { Fragment } from 'react'
import { Divider } from '@/components/ui/divider'
import { useTranslation } from 'react-i18next'

export type RadioCheckItem = {
  label: string
  value: string
  icon?: LucideIcon
}

type Props = {
  list: RadioCheckItem[]
}

export default function RadioCheckList({ list }: Props) {
  const { t } = useTranslation()

  return (
    <VStack>
      {list.map(({ label, value }, i, arr) => (
        <Fragment key={value}>
          <Radio
            size='lg'
            value={value}
            className='w-full py-4 justify-between'
          >
            <RadioLabel>{t(label)}</RadioLabel>
            <RadioIndicator className='border-0 h-6 w-6'>
              <RadioIcon as={Check} className='fill-none w-full h-full' />
            </RadioIndicator>
          </Radio>
          {arr.length - 1 === i ? null : <Divider className='my-0' />}
        </Fragment>
      ))}
    </VStack>
  )
}
