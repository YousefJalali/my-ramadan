export function formatTime(
  date: Date | string,
  is24Hour: boolean = true,
  useArabicNumbers: boolean = false
): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  const locale = useArabicNumbers ? 'ar-SA' : 'en-US'

  // Define the options for time formatting
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !is24Hour,
  }

  return new Intl.DateTimeFormat(locale, options).format(parsedDate)
}
