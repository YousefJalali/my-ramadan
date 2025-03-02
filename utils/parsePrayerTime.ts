export function parsePrayerTime(timeString: string, day?: number): Date {
  const match = timeString.match(/^(\d{2}):(\d{2})\s\(\+?(-?\d{1,2})\)$/)

  if (!match) {
    throw new Error('Invalid time format. Expected format: HH:MM (+TZ or -TZ)')
  }

  const [, hours, minutes, timezoneOffset] = match.map(Number)

  const now = new Date()
  now.setHours(hours, minutes, 0, 0) // Set the local time

  if (day) now.setDate(day)

  const offsetInMinutes = timezoneOffset * 60
  now.setMinutes(now.getMinutes() + offsetInMinutes) // Adjust for the timezone offset

  // Get the ISO string without 'Z' and manually append the timezone
  const dateString = now.toISOString().split('T')
  const datePart = dateString[0] // YYYY-MM-DD
  const timePart = dateString[1].split('.')[0] // HH:MM:SS

  // Format timezone to +TZ:00 or -TZ:00
  const tzFormatted =
    timezoneOffset >= 0
      ? `+${String(timezoneOffset).padStart(2, '0')}:00`
      : `-${String(Math.abs(timezoneOffset)).padStart(2, '0')}:00`

  return new Date(`${datePart}T${timePart}${tzFormatted}`)
}
