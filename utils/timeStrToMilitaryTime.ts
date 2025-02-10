export function timeStrToMilitaryTime(time: string | Date) {
  let d = null

  if (typeof time === 'string') {
    d = new Date(
      `${new Date().toISOString().split('T')[0]}T${time}${
        time.length > 4 ? '' : ':00'
      }`
    )
  } else {
    d = time
  }

  const hours = d.getHours()
  const minutes = d.getMinutes()
  return +`${hours}${minutes < 10 ? '0' : ''}${minutes}`
}
