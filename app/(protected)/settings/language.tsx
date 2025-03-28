import { RadioGroup } from '@/components/ui/radio'
import { useTranslation } from 'react-i18next'
import { settings$ } from '@/stores/store'
import RadioCheckList, { RadioCheckItem } from '@/components/RadioCheckList'

const l: RadioCheckItem[] = [
  {
    value: 'ar-SA',
    label: 'Arabic',
  },
  {
    value: 'en-US',
    label: 'English',
  },
]

export default function Language() {
  const { i18n } = useTranslation()

  const changeLanguage = async (lang: string) => {
    settings$.language.set(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <RadioGroup
      value={i18n.language}
      onChange={changeLanguage}
      className='w-full flex-1'
    >
      <RadioCheckList list={l} />
    </RadioGroup>
  )
}
