export function gregorianToHijri(date: Date) {
  return new Intl.DateTimeFormat('en-IS', {
    calendar: 'islamic',
    day: 'numeric',
  }).format(new Date(date))
}
