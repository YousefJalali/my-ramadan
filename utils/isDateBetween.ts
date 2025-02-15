export function isDateBetween(
  date: Date | string,
  startDate: Date | string,
  endDate: Date | string
): boolean {
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate

  return targetDate >= start && targetDate <= end
}
