import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import prayerTime from '@/constants/prayerTime'
import { Text } from '../ui/text'

export default function PrayerCountdown({ day }: { day: number }) {
  const [nextPrayer, setNextPrayer] = useState('')
  const [timeLeftToNextPrayer, setTimeLeftToNextPrayer] = useState<
    string | null
  >(null)

  const {
    t,
    i18n: { language },
  } = useTranslation()

  const calculateTimeLeft = () => {
    const now = new Date()
    const today = new Date()
    today.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0) // Set current time to today without milliseconds

    const hourLabel = language === 'ar-SA' ? 'ساعة' : 'h'
    const minuteLabel = language === 'ar-SA' ? 'دقيقة' : 'min'

    const getNextPrayer = (dayIndex: number) => {
      let closestPrayer = null
      let closestTimeDiff = Infinity

      // Find the next prayer for today or the next day
      for (const prayer of prayerTime[dayIndex]) {
        const prayerDate = new Date(prayer.time)
        prayerDate.setFullYear(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ) // Set prayer to today's date

        const timeDiff = prayerDate.getTime() - now.getTime()

        if (timeDiff > 0 && timeDiff < closestTimeDiff) {
          closestPrayer = prayer
          closestTimeDiff = timeDiff
        }
      }

      return { closestPrayer, closestTimeDiff }
    }

    // Check for today's next prayer
    let { closestPrayer, closestTimeDiff } = getNextPrayer(day)

    if (!closestPrayer) {
      // If no prayer for today, check for tomorrow's first prayer
      const tomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1) // Move to tomorrow
      const nextDay = (day + 1) % prayerTime.length // Next day's prayer index (wrap around if it's the last day)
      const nextDayPrayer = prayerTime[nextDay][0] // Get the first prayer of tomorrow

      // Set the prayer date to tomorrow
      const prayerDate = new Date(nextDayPrayer.time)
      prayerDate.setFullYear(
        tomorrow.getFullYear(),
        tomorrow.getMonth(),
        tomorrow.getDate()
      )

      closestPrayer = nextDayPrayer
      closestTimeDiff = prayerDate.getTime() - now.getTime()
    }

    // Format the countdown string
    const remainingTime = closestTimeDiff
    const hours = Math.floor(remainingTime / (1000 * 60 * 60))
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))

    let countdownString = ''
    if (hours > 0) {
      countdownString += `${hours} ${hourLabel} `
    }
    countdownString += `${minutes} ${minuteLabel}`

    // Set next prayer and time left to next prayer
    setNextPrayer(closestPrayer.prayer)
    setTimeLeftToNextPrayer(countdownString)
  }

  useEffect(() => {
    calculateTimeLeft() // Calculate on mount
    const intervalId = setInterval(() => calculateTimeLeft(), 1000) // Update every second

    return () => clearInterval(intervalId)
  }, [day, language])

  return timeLeftToNextPrayer ? (
    <Text className='text-primary-100'>
      {t('Next prayer in')}{' '}
      <Text className='text-primary-100' bold>
        {timeLeftToNextPrayer}{' '}
      </Text>
      ({t(nextPrayer)})
    </Text>
  ) : null
}
