import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DigitalClock() {
  const [time, setTime] = useState(new Date())

  const {
    i18n: { language },
  } = useTranslation()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time])

  return (
    <>
      {new Intl.DateTimeFormat(
        language === 'ar-SA' ? 'ar-u-nu-latn' : 'en-US',
        {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }
      ).format(time)}
    </>
  )
}
