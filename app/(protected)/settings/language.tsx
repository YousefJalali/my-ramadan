import { VStack } from '@/components/ui/vstack'
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio'
import { Check } from 'lucide-react-native'
import { Fragment } from 'react'
import { Divider } from '@/components/ui/divider'
import { useTranslation } from 'react-i18next'
import { settings$ } from '@/store'

const l: { lang: string; name: string; flag: string }[] = [
  {
    lang: 'ar-SA',
    name: 'Arabic',
    flag: '🇸🇦',
  },
  {
    lang: 'en-US',
    name: 'English',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
]

export default function Language() {
  const { i18n, t } = useTranslation()

  const changeLanguage = async (lang: string) => {
    settings$.language.set(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <RadioGroup value={i18n.language} onChange={changeLanguage}>
      <VStack space='xl'>
        {l.map(({ lang, name }) => (
          <Fragment key={lang}>
            <Radio
              size='lg'
              value={lang}
              className={`w-full justify-between ${
                i18n.language === 'ar-SA' ? 'flex-row-reverse' : ''
              }`}
            >
              <RadioLabel>{t(name)}</RadioLabel>
              <RadioIndicator className='border-0 h-7 w-7'>
                <RadioIcon as={Check} className='fill-none w-full h-full' />
              </RadioIndicator>
            </Radio>
            <Divider />
          </Fragment>
        ))}
      </VStack>
    </RadioGroup>
  )
}
