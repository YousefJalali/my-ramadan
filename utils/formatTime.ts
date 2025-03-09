import { DateTime } from 'luxon'

export function formatTime(
  date: Date | string | DateTime<true> | DateTime<false>,
  is24Hour: boolean = true,
  useArabicNumbers: boolean = false
): string {
  const locale = useArabicNumbers ? 'ar-SA' : 'en-US'

  let d = null
  if (DateTime.isDateTime(date)) {
    d = date
  } else {
    d = typeof date === 'string' ? new Date(date) : date
    d = DateTime.fromJSDate(d)
  }

  return (
    d
      .setLocale(locale)
      // .setZone('America/Toronto')
      .toLocaleString(DateTime.TIME_24_SIMPLE)
  )
}
