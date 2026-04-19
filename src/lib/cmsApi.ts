import { supabase } from './supabaseClient'

export type CmsPage = {
  id: string
  slug: string
  title: string
  route: string
  display_order: number
  is_published: boolean
  seo_title: string | null
  seo_description: string | null
}

export type CmsSection = {
  id: string
  page_id: string
  section_key: string
  heading: string | null
  body_markdown: string | null
  sort_order: number
  is_active: boolean
  metadata: Record<string, unknown>
}

export type CmsSetting = {
  id: string
  key: string
  value: Record<string, unknown>
  description: string | null
}

export async function isEmailAllowed(email: string): Promise<boolean> {
  if (!supabase) return false
  const { data, error } = await supabase.rpc('is_email_allowed', {
    p_email: email,
  })
  if (error) {
    console.error('is_email_allowed error', error)
    return false
  }
  return Boolean(data)
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  if (!supabase) return false
  const { data, error } = await supabase.rpc('is_admin')
  if (error) {
    console.error('is_admin error', error)
    return false
  }
  return Boolean(data)
}

export async function fetchCmsPages(): Promise<CmsPage[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('cms_pages')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as CmsPage[]
}

export async function fetchSectionsForPage(pageId: string): Promise<CmsSection[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('cms_sections')
    .select('*')
    .eq('page_id', pageId)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as CmsSection[]
}

export async function upsertSection(input: {
  id?: string
  page_id: string
  section_key: string
  heading?: string | null
  body_markdown?: string | null
  sort_order?: number
  is_active?: boolean
}): Promise<CmsSection> {
  if (!supabase) throw new Error('Supabase not configured')
  const payload = {
    ...(input.id ? { id: input.id } : {}),
    page_id: input.page_id,
    section_key: input.section_key,
    heading: input.heading ?? null,
    body_markdown: input.body_markdown ?? null,
    sort_order: input.sort_order ?? 0,
    is_active: input.is_active ?? true,
  }
  const { data, error } = await supabase
    .from('cms_sections')
    .upsert(payload, { onConflict: 'page_id,section_key' })
    .select()
    .single()
  if (error) throw error
  return data as CmsSection
}

export async function deleteSection(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('cms_sections').delete().eq('id', id)
  if (error) throw error
}

export async function fetchSetting(key: string): Promise<CmsSetting | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('cms_settings')
    .select('*')
    .eq('key', key)
    .maybeSingle()
  if (error) {
    console.error('fetchSetting error', error)
    return null
  }
  return (data as CmsSetting | null) ?? null
}

export async function upsertSetting(
  key: string,
  value: Record<string, unknown>,
  description?: string,
): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase
    .from('cms_settings')
    .upsert({ key, value, description: description ?? null }, { onConflict: 'key' })
  if (error) throw error
}

export async function fetchAllowedEmails(): Promise<{ id: string; email: string; note: string | null }[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('admin_allowed_emails')
    .select('id, email, note')
    .order('email', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function addAllowedEmail(email: string, note?: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase
    .from('admin_allowed_emails')
    .insert({ email: email.trim().toLowerCase(), note: note ?? null })
  if (error) throw error
}

export async function removeAllowedEmail(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('admin_allowed_emails').delete().eq('id', id)
  if (error) throw error
}
