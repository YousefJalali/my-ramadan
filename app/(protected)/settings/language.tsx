import { VStack } from '@/components/ui/vstack'
import { ScrollView } from 'react-native'
import translations from '@/constants/translations'
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio'
import { Check } from 'lucide-react-native'
import { Fragment, useState } from 'react'
import { Divider } from '@/components/ui/divider'

const l: { [key: string]: { name: string; flag: string } } = {
  ar: {
    name: 'Arabic - العربية',
    flag: '🇸🇦',
  },
  en: {
    name: 'English',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
}

export default function Language() {
  const [values, setValues] = useState('en')

  return (
    <VStack>
      <ScrollView>
        <RadioGroup value={values} onChange={setValues}>
          <VStack space='xl'>
            {Object.keys(translations).map((t) => (
              <Fragment key={t}>
                <Radio size='lg' value={t}>
                  <RadioLabel className='flex-1'>{l[t].name}</RadioLabel>
                  <RadioIndicator className='border-0 h-7 w-7'>
                    <RadioIcon as={Check} className='fill-none w-full h-full' />
                  </RadioIndicator>
                </Radio>
                <Divider />
              </Fragment>
            ))}
          </VStack>
        </RadioGroup>
      </ScrollView>
    </VStack>
  )
}
