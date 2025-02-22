import * as Localization from 'expo-localization'

export const getLocale = () => {
  console.log('get phone locale')
  const locale = Localization.getLocales()[0]?.languageTag

  if (!locale) return 'en-US'

  if (locale.startsWith('en')) return 'en-US'
  if (locale.startsWith('ar')) return 'ar-SA'

  return locale
}
