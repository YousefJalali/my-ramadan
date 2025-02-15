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
// import { I18nManager } from 'react-native'
// import * as Updates from 'expo-updates'

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

    // const shouldBeRTL = lang === 'ar-SA'

    // I18nManager.allowRTL(shouldBeRTL)
    // I18nManager.forceRTL(shouldBeRTL)
    // Updates.reloadAsync()
  }

  return (
    <RadioGroup
      value={i18n.language}
      onChange={changeLanguage}
      className='w-full flex-1'
    >
      <VStack space='xl'>
        {l.map(({ lang, name }, i, arr) => (
          <Fragment key={lang}>
            <Radio
              size='lg'
              value={lang}
              className='w-full py-2 justify-between'
            >
              <RadioLabel>{t(name)}</RadioLabel>
              <RadioIndicator className='border-0 h-7 w-7 '>
                <RadioIcon as={Check} className='fill-none w-full h-full' />
              </RadioIndicator>
            </Radio>
            {arr.length - 1 === i ? null : <Divider className='my-0' />}
          </Fragment>
        ))}
      </VStack>
    </RadioGroup>
  )
}
