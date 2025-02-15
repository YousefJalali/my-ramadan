function getTimeDifference(
  startTime: Date | string,
  endTime: Date | string
): { hours: number; minutes: number; seconds: number } {
  // If the times are strings, convert them to Date objects
  const start = typeof startTime === 'string' ? new Date(startTime) : startTime
  const end = typeof endTime === 'string' ? new Date(endTime) : endTime

  // Calculate the difference in milliseconds
  const differenceInMillis = end.getTime() - start.getTime()

  // Convert the difference to hours, minutes, and seconds
  const hours = Math.floor(differenceInMillis / (1000 * 60 * 60)) // 1 hour = 1000 * 60 * 60 milliseconds
  const minutes = Math.floor(
    (differenceInMillis % (1000 * 60 * 60)) / (1000 * 60)
  ) // 1 minute = 1000 * 60 milliseconds
  const seconds = Math.floor((differenceInMillis % (1000 * 60)) / 1000) // 1 second = 1000 milliseconds

  return { hours, minutes, seconds }
}
