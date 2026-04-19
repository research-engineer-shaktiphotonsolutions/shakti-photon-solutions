import { mediaBucketName, supabase } from './supabaseClient'
import type { MediaAssetRow, MediaFetchFilters } from '../types/media'

function normalizePath(path: string) {
  return path.replace(/^\/+/, '')
}

export function getPublicMediaUrl(storagePath: string) {
  if (!supabase) return null
  const { data } = supabase.storage.from(mediaBucketName).getPublicUrl(normalizePath(storagePath))
  return data.publicUrl
}

export async function fetchMediaAssets(filters: MediaFetchFilters): Promise<MediaAssetRow[]> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  let query = supabase
    .from('cms_media')
    .select('*')
    .eq('is_active', true)
    .eq('page_slug', filters.page)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (filters.subsection) {
    query = query.eq('subsection_slug', filters.subsection)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to load media assets: ${error.message}`)
  }

  return (data ?? []) as MediaAssetRow[]
}
