import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEn from './locales/en-US/translation.json'
import translationAr from './locales/ar-SA/translation.json'
import { settings$ } from '@/stores/store'

const resources = {
  'ar-SA': { translation: translationAr },
  'en-US': { translation: translationEn },
}

const initI18n = async () => {
  let savedLanguage = settings$.get().language

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: savedLanguage,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  })
}

initI18n()

export default i18n
