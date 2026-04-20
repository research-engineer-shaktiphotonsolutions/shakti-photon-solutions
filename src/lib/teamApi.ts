import { supabase } from './supabaseClient'

export type TeamCategory = 'founder' | 'core' | 'advisor'

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string | null
  photo_url: string | null
  category: TeamCategory
  sort_order: number
  is_active: boolean
}

export async function fetchTeamMembers(opts?: { activeOnly?: boolean }): Promise<TeamMember[]> {
  if (!supabase) return []
  let query = supabase
    .from('team_members')
    .select('id, name, role, bio, photo_url, category, sort_order, is_active')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })

  if (opts?.activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as TeamMember[]
}

export async function upsertTeamMember(input: {
  id?: string
  name: string
  role: string
  bio?: string | null
  photo_url?: string | null
  category: TeamCategory
  sort_order?: number
  is_active?: boolean
}): Promise<TeamMember> {
  if (!supabase) throw new Error('Supabase not configured')
  const payload = {
    ...(input.id ? { id: input.id } : {}),
    name: input.name,
    role: input.role,
    bio: input.bio ?? null,
    photo_url: input.photo_url ?? null,
    category: input.category,
    sort_order: input.sort_order ?? 0,
    is_active: input.is_active ?? true,
  }
  const { data, error } = await supabase
    .from('team_members')
    .upsert(payload)
    .select()
    .single()
  if (error) throw error
  return data as TeamMember
}

export async function deleteTeamMember(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('team_members').delete().eq('id', id)
  if (error) throw error
}
