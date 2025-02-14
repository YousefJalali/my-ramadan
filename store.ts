import { observable } from '@legendapp/state'
import { Session } from '@supabase/supabase-js'
import * as Localization from 'expo-localization'

export const session$ = observable<Session | null>(null)

// export const language$ = observable({
//   lang:Localization.getLocales()[0]?.languageTag,
//   change: (lang:string) => {
//     language$.lang.set(lang)

//   }
// })

export const settings$ = observable<{
  language: string
  notifications: { [key: string]: boolean }
}>({
  language: Localization.getLocales()[0]?.languageTag,
  notifications: {
    prayers: true,
    azkar: true,
    quran: true,
  },
})
