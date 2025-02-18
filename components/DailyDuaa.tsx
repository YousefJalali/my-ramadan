import dailyDuaa from '@/constants/dailyDuaa'
import { Text } from './ui/text'
import { useTranslation } from 'react-i18next'

type Props = {
  dayIndex: number
}

export default function DailyDuaa({ dayIndex }: Props) {
  const {
    i18n: { language },
  } = useTranslation()

  return (
    <Text className='bg-neutral-100 rounded-2xl p-4'>
      {dailyDuaa[language][dayIndex]}
    </Text>
  )
}
