import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: any) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

export const supabaseUrl = 'https://buwskjtoapwcxnsgsqrs.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3NranRvYXB3Y3huc2dzcXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5Mjg2MDAsImV4cCI6MjA1NDUwNDYwMH0.LuPHCoyBDoBf6YwFOSv1H3FCigJ77KDGptQg3D10tno'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
  },
})
