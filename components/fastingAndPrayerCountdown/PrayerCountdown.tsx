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

    // Get today's date (current date without time)
    const today = new Date()
    today.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0) // Set current time

    let closestPrayer = null
    let closestTimeDiff = Infinity

    // Find the next prayer and the time difference
    for (const prayer of prayerTime[day]) {
      const prayerDate = new Date(prayer.time)

      // Set the prayer date to today's date
      prayerDate.setFullYear(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )

      const timeDiff = prayerDate.getTime() - today.getTime()

      if (timeDiff > 0 && timeDiff < closestTimeDiff) {
        closestPrayer = prayer
        closestTimeDiff = timeDiff
      }
    }

    if (closestPrayer) {
      setNextPrayer(closestPrayer.prayer)

      // Calculate the remaining time in hours and minutes
      const remainingTime = closestTimeDiff

      const hours = Math.floor(remainingTime / (1000 * 60 * 60))
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      )

      let countdownString = ''

      // Format the countdown string based on Arabic or English
      const hourLabel = language === 'ar-SA' ? 'ساعة' : 'h'
      const minuteLabel = language === 'ar-SA' ? 'دقيقة' : 'min'

      if (hours > 0) {
        countdownString += `${hours} ${hourLabel} `
      }

      countdownString += `${minutes} ${minuteLabel}`

      setTimeLeftToNextPrayer(countdownString)
    } else {
      setTimeLeftToNextPrayer(null) // No upcoming prayers today
    }
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
