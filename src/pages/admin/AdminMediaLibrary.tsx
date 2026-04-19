import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { getPublicMediaUrl } from '../../lib/mediaRepository'
import type { MediaAssetRow } from '../../types/media'

export function AdminMediaLibrary() {
  const [rows, setRows] = useState<MediaAssetRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let alive = true
    if (!supabase) {
      setError('Supabase not configured')
      setLoading(false)
      return
    }
    supabase
      .from('cms_media')
      .select('*')
      .order('page_slug')
      .order('subsection_slug')
      .order('sort_order')
      .then(({ data, error: err }) => {
        if (!alive) return
        if (err) setError(err.message)
        else setRows((data ?? []) as MediaAssetRow[])
        setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  const filtered = filter
    ? rows.filter((r) =>
        `${r.page_slug} ${r.subsection_slug} ${r.asset_name}`.toLowerCase().includes(filter.toLowerCase()),
      )
    : rows

  return (
    <section className="admin-block">
      <h2>Media Library</h2>
      <p>All assets registered in <code>cms_media</code>. Upload new files in the page editor.</p>

      <input
        type="search"
        placeholder="Filter by page, section, or name…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="admin-media-filter"
      />

      {error && <p className="admin-status error">{error}</p>}
      {loading && <p>Loading…</p>}

      {!loading && (
        <div className="admin-media-grid">
          {filtered.map((r) => {
            const url = getPublicMediaUrl(r.storage_path)
            return (
              <figure key={r.id} className="admin-media-tile">
                {url && r.kind === 'image' ? (
                  <img src={url} alt={r.alt_text ?? r.asset_name} loading="lazy" />
                ) : (
                  <div className="admin-media-placeholder">{r.kind.toUpperCase()}</div>
                )}
                <figcaption>
                  <strong>{r.asset_name}</strong>
                  <span>
                    {r.page_slug} / {r.subsection_slug}
                  </span>
                </figcaption>
              </figure>
            )
          })}
          {filtered.length === 0 && <p>No assets match.</p>}
        </div>
      )}
    </section>
  )
}
