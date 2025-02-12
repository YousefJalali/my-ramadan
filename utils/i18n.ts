import translations from '@/constants/translations'
import { I18n } from 'i18n-js'

const i18n = new I18n(translations)
i18n.enableFallback = true

export { i18n }
