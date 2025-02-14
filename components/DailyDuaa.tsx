import dailyDuaa from '@/constants/dailyDuaa'
import { Center } from './ui/center'
import { Text } from './ui/text'
import Section from './Section'
import { Sprout } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

type Props = {
  day: number
}

export default function DailyDuaa({ day }: Props) {
  const { t } = useTranslation()

  return (
    <Section title={t('Daily Duaa')} icon={Sprout}>
      <Center className='bg-neutral-100 rounded-2xl p-4'>
        <Text>{dailyDuaa[day]}</Text>
      </Center>
    </Section>
  )
}
