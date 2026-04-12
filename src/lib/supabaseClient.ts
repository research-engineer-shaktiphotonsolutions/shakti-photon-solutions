import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const mediaBucketName =
  (import.meta.env.VITE_SUPABASE_MEDIA_BUCKET as string | undefined) ?? 'site-media'

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export function isSupabaseConfigured() {
  return Boolean(supabase)
}

export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  return supabase
}
