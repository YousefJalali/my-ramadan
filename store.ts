import { observable } from '@legendapp/state'
import { Session } from '@supabase/supabase-js'

export const session$ = observable<Session | null>(null)
