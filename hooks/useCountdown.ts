import { useState, useEffect } from 'react'
import { mapRange } from '@/utils/mapRange'
import { DateTime } from 'luxon'
import { prayerTimes$ } from '@/store'
import { use$ } from '@legendapp/state/react'

const { floor } = Math

export function useFastingCountdown(day: number) {
  const { Imsak, Maghrib } = use$(() =>
    prayerTimes$.getDayParsedPrayerTimes(day)
  )

  const calculateTimeLeft = () => {
    const now = DateTime.fromISO(new Date().toISOString())

    const difference = Maghrib.diff(now)

    if (difference.as('milliseconds') <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, progress: 0 }
    }

    const days = floor(difference.as('days'))
    const hours = floor(difference.as('hours'))
    const minutes = floor(difference.as('minutes') - hours * 60)
    const seconds = floor(difference.as('seconds'))

    const start = Imsak.toMillis()
    const end = Maghrib.toMillis()

    // console.log(start, end)

    const progress = mapRange(
      difference.as('milliseconds') + start,
      end,
      start,
      0,
      50
    )

    // console.log(progress)

    return {
      days,
      hours,
      minutes,
      seconds,
      progress,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [Maghrib])

  return timeLeft
}

function useCountdown(targetDate: Date | string) {
  const calculateTimeLeft = () => {
    const now = new Date()
    const endDate = new Date(targetDate)
    const difference = endDate.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

export default useCountdown
