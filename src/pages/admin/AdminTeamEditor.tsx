import { useEffect, useState } from 'react'
import {
  deleteTeamMember,
  fetchTeamMembers,
  upsertTeamMember,
  type TeamCategory,
  type TeamMember,
} from '../../lib/teamApi'

type Draft = {
  id?: string
  name: string
  role: string
  bio: string
  photo_url: string
  category: TeamCategory
  sort_order: number
  is_active: boolean
  isNew?: boolean
}

const CATEGORY_LABELS: Record<TeamCategory, string> = {
  founder: 'Founders',
  core: 'Core Team',
  advisor: 'Advisors',
}

function toDraft(m: TeamMember): Draft {
  return {
    id: m.id,
    name: m.name,
    role: m.role,
    bio: m.bio ?? '',
    photo_url: m.photo_url ?? '',
    category: m.category,
    sort_order: m.sort_order,
    is_active: m.is_active,
  }
}

export function AdminTeamEditor() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    fetchTeamMembers()
      .then((data) => alive && setDrafts(data.map(toDraft)))
      .catch((err) => alive && setError(err.message ?? 'Failed to load team'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  function updateDraft(idx: number, patch: Partial<Draft>) {
    setDrafts((cur) => cur.map((d, i) => (i === idx ? { ...d, ...patch } : d)))
  }

  function addNew(category: TeamCategory) {
    const inCategory = drafts.filter((d) => d.category === category)
    const nextSort =
      inCategory.length === 0 ? 10 : Math.max(...inCategory.map((d) => d.sort_order)) + 10
    setDrafts((cur) => [
      ...cur,
      {
        name: '',
        role: '',
        bio: '',
        photo_url: '',
        category,
        sort_order: nextSort,
        is_active: true,
        isNew: true,
      },
    ])
  }

  async function handleSave(idx: number) {
    const d = drafts[idx]
    if (!d.name.trim() || !d.role.trim()) {
      setError('Name and role are required.')
      return
    }
    setError('')
    const key = d.id ?? `new-${idx}`
    setSavingId(key)
    try {
      const saved = await upsertTeamMember({
        id: d.id,
        name: d.name.trim(),
        role: d.role.trim(),
        bio: d.bio.trim() || null,
        photo_url: d.photo_url.trim() || null,
        category: d.category,
        sort_order: d.sort_order,
        is_active: d.is_active,
      })
      setDrafts((cur) => cur.map((x, i) => (i === idx ? toDraft(saved) : x)))
      setSavedId(saved.id)
      setTimeout(() => setSavedId(null), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSavingId(null)
    }
  }

  async function handleDelete(idx: number) {
    const d = drafts[idx]
    if (!d.id) {
      setDrafts((cur) => cur.filter((_, i) => i !== idx))
      return
    }
    if (!confirm(`Delete "${d.name}"? This cannot be undone.`)) return
    try {
      await deleteTeamMember(d.id)
      setDrafts((cur) => cur.filter((_, i) => i !== idx))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const categories: TeamCategory[] = ['founder', 'core', 'advisor']

  return (
    <section className="admin-block">
      <header className="admin-page-header">
        <div>
          <h2>Team Page</h2>
          <p>Manage founders, core team, and advisors. Changes appear on <code>/team</code>.</p>
        </div>
      </header>

      {error && <p className="admin-status error">{error}</p>}
      {loading && <p>Loading team…</p>}

      {!loading &&
        categories.map((cat) => {
          const members = drafts
            .map((d, idx) => ({ d, idx }))
            .filter(({ d }) => d.category === cat)

          return (
            <div key={cat} className="admin-block" style={{ marginTop: '1.5rem' }}>
              <header className="admin-page-header">
                <h3 style={{ margin: 0 }}>{CATEGORY_LABELS[cat]}</h3>
                <button type="button" onClick={() => addNew(cat)}>
                  + Add {cat}
                </button>
              </header>

              {members.length === 0 && (
                <p className="admin-empty">No {CATEGORY_LABELS[cat].toLowerCase()} yet.</p>
              )}

              <div className="admin-sections-list">
                {members.map(({ d, idx }) => {
                  const key = d.id ?? `new-${idx}`
                  return (
                    <article key={key} className="admin-section-card">
                      <div className="admin-section-row">
                        <label>
                          Name
                          <input
                            type="text"
                            value={d.name}
                            onChange={(e) => updateDraft(idx, { name: e.target.value })}
                            placeholder="Full name"
                          />
                        </label>
                        <label>
                          Role / Title
                          <input
                            type="text"
                            value={d.role}
                            onChange={(e) => updateDraft(idx, { role: e.target.value })}
                            placeholder="e.g. Research Engineer"
                          />
                        </label>
                      </div>

                      <div className="admin-section-row">
                        <label>
                          Sort order
                          <input
                            type="number"
                            value={d.sort_order}
                            onChange={(e) =>
                              updateDraft(idx, { sort_order: Number(e.target.value) || 0 })
                            }
                          />
                        </label>
                        <label className="admin-checkbox-label">
                          <input
                            type="checkbox"
                            checked={d.is_active}
                            onChange={(e) => updateDraft(idx, { is_active: e.target.checked })}
                          />
                          Active (visible on site)
                        </label>
                      </div>

                      <label>
                        Photo URL or path
                        <input
                          type="text"
                          value={d.photo_url}
                          onChange={(e) => updateDraft(idx, { photo_url: e.target.value })}
                          placeholder="/assets/images/team/... or full URL"
                        />
                      </label>

                      {d.photo_url && (
                        <img
                          src={d.photo_url}
                          alt={d.name || 'Preview'}
                          style={{
                            maxWidth: 120,
                            maxHeight: 120,
                            borderRadius: 8,
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      )}

                      <label>
                        Bio (optional, used for founders)
                        <textarea
                          rows={4}
                          value={d.bio}
                          onChange={(e) => updateDraft(idx, { bio: e.target.value })}
                          placeholder="Long-form description (founders only)"
                        />
                      </label>

                      <div className="admin-form-actions">
                        <button
                          type="button"
                          onClick={() => handleSave(idx)}
                          disabled={savingId === (d.id ?? `new-${idx}`)}
                        >
                          {savingId === (d.id ?? `new-${idx}`) ? 'Saving…' : 'Save'}
                        </button>
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => handleDelete(idx)}
                        >
                          {d.id ? 'Delete' : 'Discard'}
                        </button>
                        {savedId === d.id && (
                          <span className="admin-status success">Saved.</span>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )
        })}
    </section>
  )
}
