import dailyDuaa from '@/constants/dailyDuaa'
import { Text } from './ui/text'
import Section from './Section'
import { Sprout } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

type Props = {
  day: number
}

export default function DailyDuaa({ day }: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <Section title={t('Daily Duaa')} icon={Sprout}>
      <Text className='bg-neutral-100 rounded-2xl p-4 min-w-full'>
        {dailyDuaa[language][day]}
      </Text>
    </Section>
  )
}
