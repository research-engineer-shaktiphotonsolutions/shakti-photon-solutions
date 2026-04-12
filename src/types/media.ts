export type MediaAssetKind = 'image' | 'video' | 'gif'

export interface MediaAssetRow {
  id: string
  page_slug: string
  subsection_slug: string
  asset_name: string
  kind: MediaAssetKind
  storage_bucket: string
  storage_path: string
  mime_type: string | null
  alt_text: string | null
  caption: string | null
  sort_order: number
  source_url: string | null
  metadata: Record<string, unknown>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MediaFetchFilters {
  page: string
  subsection?: string
}
