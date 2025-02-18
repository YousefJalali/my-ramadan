export function setToTodaysDate(date: string) {
  const now = new Date()
  const d = new Date(date)
  d.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())

  return d
}
