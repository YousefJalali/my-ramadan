import { addZero } from '@/hooks/addZero'

export function formatCountdown(hrs: number, min: number, lang = 'en-US') {
  let hours = hrs.toString()
  let minutes = min.toString()
  let hoursLabel = ''
  let minutesLabel = ''

  if (lang === 'ar-SA') {
    if (hrs <= 2) hours = ''
    if (min <= 2) minutes = ''
    minutesLabel =
      min === 1
        ? 'دقيقة واحدة'
        : hrs === 2
        ? 'دقيقتين'
        : min < 11
        ? ' دقائق'
        : ' دقيقة'

    hoursLabel =
      hrs === 1 ? 'ساعة' : hrs === 2 ? 'ساعتين' : hrs < 11 ? ' ساعات' : ' ساعة'

    hoursLabel += hrs < 1 ? '' : ' و '
  } else {
    hoursLabel = 'h'
    minutesLabel = 'min'
  }

  if (hrs < 1) {
    hours = ''
    hoursLabel = ''
  } else {
    minutes = addZero(min)
  }

  return `${hours}${hoursLabel}${minutes}${minutesLabel}`
}
