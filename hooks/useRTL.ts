import { settings$ } from '@/store'
import { use$ } from '@legendapp/state/react'

export function useRTL({
  className,
  style,
}: {
  className: string | undefined
  style: string
}) {
  const { language } = use$(settings$)
  const rtl = `${language === 'ar-SA' ? style : ''}`

  return { cn: `${className || ''} ${rtl}` }
}
