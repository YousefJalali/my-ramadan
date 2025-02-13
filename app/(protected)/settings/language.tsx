import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { ScrollView } from 'react-native'
import translations from '@/constants/translations'

import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio'
import { CircleIcon } from 'lucide-react-native'
import { Fragment, useState } from 'react'
import { HStack } from '@/components/ui/hstack'
import { Divider } from '@/components/ui/divider'

const l: { [key: string]: { name: string; flag: string } } = {
  en: {
    name: 'English',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  ar: {
    name: 'Arabic',
    flag: '🇸🇦',
  },
}

export default function Language() {
  const [values, setValues] = useState('en')

  return (
    <VStack>
      {/* <Text>Select language</Text> */}
      <ScrollView>
        <RadioGroup value={values} onChange={setValues}>
          <VStack space='xl'>
            {Object.keys(translations).map((t) => (
              <Fragment key={t}>
                <Radio size='lg' value={t}>
                  <HStack className='flex-1' space='sm'>
                    <RadioLabel>{l[t].name}</RadioLabel>
                    <RadioLabel>{l[t].flag}</RadioLabel>
                  </HStack>
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} size='md' />
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
