import dailyDuaa from '@/constants/dailyDuaa'
import { Text } from './ui/text'
import { useTranslation } from 'react-i18next'

type Props = {
  day: number
}

export default function DailyDuaa({ day }: Props) {
  const {
    i18n: { language },
  } = useTranslation()

  return (
    <Text className='bg-neutral-100 rounded-2xl p-4'>
      {dailyDuaa[language][day]}
    </Text>
  )
}
