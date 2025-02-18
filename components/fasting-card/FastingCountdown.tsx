import useCountdown from '@/hooks/useCountdown'
import { Text } from '../ui/text'
import prayerTime from '@/constants/prayerTime'
import { HStack } from '../ui/hstack'
import { useTranslation } from 'react-i18next'
import { formatCountdown } from '@/utils/formatCountdown'

function setPrayerDateToToday(date: string) {
  const now = new Date()
  const d = new Date(date)
  d.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())

  return d
}

export default function FastingCountdown({ dayIndex }: { dayIndex: number }) {
  const { hours, minutes, seconds } = useCountdown(
    setPrayerDateToToday(prayerTime[dayIndex][3].time)
  )

  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <HStack className='mt-1' space='xs'>
      {hours + minutes > 0 ? (
        <>
          <Text bold className='text-primary-50'>
            {formatCountdown(hours, minutes, language)}
          </Text>
          <Text className='text-primary-100 '>
            {t('left to break fasting')}
          </Text>
        </>
      ) : (
        <Text className='text-primary-50'>تقبل الله صيامكم و شهية طيبة ❤️</Text>
      )}
    </HStack>
  )
}
