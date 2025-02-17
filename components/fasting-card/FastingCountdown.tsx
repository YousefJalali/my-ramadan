import useCountdown from '@/hooks/useCountdown'
import { Text } from '../ui/text'
import prayerTime from '@/constants/prayerTime'
import { HStack } from '../ui/hstack'
import { addZero } from '@/hooks/addZero'
import { useTranslation } from 'react-i18next'

export default function FastingCountdown({ day }: { day: number }) {
  //change now to prayer date
  const now = new Date()
  const d = new Date(prayerTime[day][3].time)
  d.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())

  const { hours, minutes, seconds } = useCountdown(d)
  const { t } = useTranslation()

  return (
    <HStack className='mt-1' space='xs'>
      <Text bold className='text-primary-50'>
        {hours}:{addZero(minutes)}:{addZero(seconds)}
      </Text>
      <Text className='text-primary-100 '>{t('left to break fasting')}</Text>
    </HStack>
  )
}
