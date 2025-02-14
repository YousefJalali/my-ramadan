import { useTranslation } from 'react-i18next'

export function useRTL({
  className,
  style,
}: {
  className: string | undefined
  style: string
}) {
  const { i18n } = useTranslation()
  const rtl = `${i18n.language === 'ar-SA' ? style : ''}`

  return { cn: `${className || ''} ${rtl}` }
}
