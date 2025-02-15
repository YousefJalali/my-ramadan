import { observable } from '@legendapp/state'
import { Session } from '@supabase/supabase-js'
import * as Localization from 'expo-localization'

export const session$ = observable<Session | null>(null)

const getNormalizedLocale = () => {
  const locale = Localization.getLocales()[0]?.languageTag

  if (locale.startsWith('en')) return 'en-US'
  if (locale.startsWith('ar')) return 'ar-SA'

  return locale
}

export const settings$ = observable({
  language: getNormalizedLocale(),
  notifications: {
    prayers: true,
    azkar: true,
    quran: true,
  },
})
