import { useState, useEffect } from 'react'
import { mapRange } from '@/utils/mapRange'
import { DateTime, Duration } from 'luxon'
import { prayerTimes$ } from '@/store'
import { use$ } from '@legendapp/state/react'

const { floor } = Math

const DEFAULT_COUNTDOWN = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  progress: 0,
}

function useCounter(
  callback: () => typeof DEFAULT_COUNTDOWN,
  dependencies: any[]
) {
  const [timeLeft, setTimeLeft] = useState(callback)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(callback())
    }, 1000)

    return () => clearInterval(timer)
  }, [...dependencies])

  return timeLeft
}

export function useFastingCountdown(day: number) {
  const { Imsak, Maghrib } = use$(() =>
    prayerTimes$.getDayParsedPrayerTimes(day)
  )

  const calculateTimeLeft = () => {
    const now = DateTime.fromISO(new Date().toISOString())

    const difference = Maghrib.diff(now)

    if (difference.as('milliseconds') <= 0) {
      return DEFAULT_COUNTDOWN
    }

    const start = Imsak.toMillis()
    const end = Maghrib.toMillis()

    const progress = mapRange(
      difference.as('milliseconds') + start,
      end,
      start,
      0,
      50
    )

    return {
      ...getParts(difference),
      progress,
    }
  }

  const count = useCounter(calculateTimeLeft, [Imsak, Maghrib])

  return count
}

export function useNextPrayerCountdown(
  nextPrayer: DateTime<true> | DateTime<false>
) {
  const calculateTimeLeft = () => {
    const now = DateTime.fromISO(new Date().toISOString())

    const difference = nextPrayer.diff(now)

    if (difference.as('milliseconds') <= 0) {
      return DEFAULT_COUNTDOWN
    }

    return {
      ...getParts(difference),
      progress: 0,
    }
  }

  const count = useCounter(calculateTimeLeft, [nextPrayer])

  return count
}

function getParts(difference: Duration) {
  const days = floor(difference.as('days'))
  const hours = floor(difference.as('hours'))
  const minutes = floor(difference.as('minutes') - hours * 60)
  const seconds = floor(difference.as('seconds'))

  return { days, hours, minutes, seconds }
}
