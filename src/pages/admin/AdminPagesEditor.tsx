import { useEffect, useState } from 'react'
import {
  deleteSection,
  fetchSectionsForPage,
  upsertSection,
  type CmsPage,
  type CmsSection,
} from '../../lib/cmsApi'

type Props = {
  page: CmsPage
}

type Draft = {
  id?: string
  section_key: string
  heading: string
  body_markdown: string
  sort_order: number
  is_active: boolean
  isNew?: boolean
}

function toDraft(s: CmsSection): Draft {
  return {
    id: s.id,
    section_key: s.section_key,
    heading: s.heading ?? '',
    body_markdown: s.body_markdown ?? '',
    sort_order: s.sort_order,
    is_active: s.is_active,
  }
}

export function AdminPagesEditor({ page }: Props) {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [savedKey, setSavedKey] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')
    fetchSectionsForPage(page.id)
      .then((data) => alive && setDrafts(data.map(toDraft)))
      .catch((err) => alive && setError(err.message ?? 'Failed to load sections'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [page.id])

  function updateDraft(idx: number, patch: Partial<Draft>) {
    setDrafts((current) => current.map((d, i) => (i === idx ? { ...d, ...patch } : d)))
  }

  function addNewSection() {
    const nextSort = drafts.length === 0 ? 0 : Math.max(...drafts.map((d) => d.sort_order)) + 10
    setDrafts((current) => [
      ...current,
      {
        section_key: '',
        heading: '',
        body_markdown: '',
        sort_order: nextSort,
        is_active: true,
        isNew: true,
      },
    ])
  }

  async function handleSave(idx: number) {
    const draft = drafts[idx]
    if (!draft.section_key.trim()) {
      setError('Section key is required (e.g. hero, mission).')
      return
    }
    setError('')
    setSavingKey(draft.section_key)
    try {
      const saved = await upsertSection({
        id: draft.id,
        page_id: page.id,
        section_key: draft.section_key.trim(),
        heading: draft.heading || null,
        body_markdown: draft.body_markdown || null,
        sort_order: draft.sort_order,
        is_active: draft.is_active,
      })
      setDrafts((current) => current.map((d, i) => (i === idx ? toDraft(saved) : d)))
      setSavedKey(saved.section_key)
      setTimeout(() => setSavedKey(null), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSavingKey(null)
    }
  }

  async function handleDelete(idx: number) {
    const draft = drafts[idx]
    if (!draft.id) {
      setDrafts((current) => current.filter((_, i) => i !== idx))
      return
    }
    if (!confirm(`Delete section "${draft.section_key}"? This cannot be undone.`)) return
    try {
      await deleteSection(draft.id)
      setDrafts((current) => current.filter((_, i) => i !== idx))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  return (
    <section className="admin-block">
      <header className="admin-page-header">
        <div>
          <h2>{page.title}</h2>
          <p>
            Route: <code>{page.route}</code> · slug: <code>{page.slug}</code>
          </p>
        </div>
        <button type="button" onClick={addNewSection}>+ Add section</button>
      </header>

      {error && <p className="admin-status error">{error}</p>}
      {loading && <p>Loading sections…</p>}

      {!loading && drafts.length === 0 && (
        <p className="admin-empty">
          No sections yet. Click <strong>+ Add section</strong> to create the first one.
        </p>
      )}

      <div className="admin-sections-list">
        {drafts.map((draft, idx) => (
          <article key={draft.id ?? `new-${idx}`} className="admin-section-card">
            <div className="admin-section-row">
              <label>
                Section key
                <input
                  type="text"
                  value={draft.section_key}
                  onChange={(e) => updateDraft(idx, { section_key: e.target.value })}
                  placeholder="hero"
                />
              </label>
              <label>
                Sort order
                <input
                  type="number"
                  value={draft.sort_order}
                  onChange={(e) => updateDraft(idx, { sort_order: Number(e.target.value) || 0 })}
                />
              </label>
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={draft.is_active}
                  onChange={(e) => updateDraft(idx, { is_active: e.target.checked })}
                />
                Active
              </label>
            </div>

            <label>
              Heading
              <input
                type="text"
                value={draft.heading}
                onChange={(e) => updateDraft(idx, { heading: e.target.value })}
                placeholder="Section heading"
              />
            </label>

            <label>
              Body (Markdown)
              <textarea
                rows={6}
                value={draft.body_markdown}
                onChange={(e) => updateDraft(idx, { body_markdown: e.target.value })}
                placeholder="Markdown content. Supports **bold**, *italic*, [links](https://...), and lists."
              />
            </label>

            <div className="admin-form-actions">
              <button type="button" onClick={() => handleSave(idx)} disabled={savingKey === draft.section_key}>
                {savingKey === draft.section_key ? 'Saving…' : 'Save section'}
              </button>
              <button type="button" className="secondary" onClick={() => handleDelete(idx)}>
                {draft.id ? 'Delete' : 'Discard'}
              </button>
              {savedKey === draft.section_key && <span className="admin-status success">Saved.</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
