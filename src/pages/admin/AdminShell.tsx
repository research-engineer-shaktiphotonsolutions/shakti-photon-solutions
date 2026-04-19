import { useEffect, useMemo, useState } from 'react'
import { fetchCmsPages, type CmsPage } from '../../lib/cmsApi'
import { AdminPagesEditor } from './AdminPagesEditor'
import { AdminSettingsEditor } from './AdminSettingsEditor'
import { AdminAllowlistEditor } from './AdminAllowlistEditor'
import { AdminLeadsPanel } from '../../components/AdminLeadsPanel'
import { AdminMediaLibrary } from './AdminMediaLibrary'

type Tab =
  | { kind: 'page'; pageSlug: string }
  | { kind: 'ticker' }
  | { kind: 'leads' }
  | { kind: 'media' }
  | { kind: 'admins' }

export function AdminShell() {
  const [pages, setPages] = useState<CmsPage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>({ kind: 'ticker' })

  useEffect(() => {
    let alive = true
    fetchCmsPages()
      .then((data) => {
        if (!alive) return
        setPages(data)
        if (data.length > 0) setTab({ kind: 'page', pageSlug: data[0].slug })
      })
      .catch((err) => alive && setError(err.message ?? 'Failed to load pages'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const activePage = useMemo(
    () => (tab.kind === 'page' ? pages.find((p) => p.slug === tab.pageSlug) ?? null : null),
    [tab, pages],
  )

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-section">
          <h3>Pages</h3>
          {loading && <p className="admin-sidebar-empty">Loading…</p>}
          {!loading && pages.length === 0 && <p className="admin-sidebar-empty">No pages yet.</p>}
          <ul>
            {pages.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={tab.kind === 'page' && tab.pageSlug === p.slug ? 'active' : ''}
                  onClick={() => setTab({ kind: 'page', pageSlug: p.slug })}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-sidebar-section">
          <h3>Site</h3>
          <ul>
            <li>
              <button
                type="button"
                className={tab.kind === 'ticker' ? 'active' : ''}
                onClick={() => setTab({ kind: 'ticker' })}
              >
                Ticker &amp; Settings
              </button>
            </li>
            <li>
              <button
                type="button"
                className={tab.kind === 'media' ? 'active' : ''}
                onClick={() => setTab({ kind: 'media' })}
              >
                Media Library
              </button>
            </li>
          </ul>
        </div>

        <div className="admin-sidebar-section">
          <h3>Operations</h3>
          <ul>
            <li>
              <button
                type="button"
                className={tab.kind === 'leads' ? 'active' : ''}
                onClick={() => setTab({ kind: 'leads' })}
              >
                Leads
              </button>
            </li>
            <li>
              <button
                type="button"
                className={tab.kind === 'admins' ? 'active' : ''}
                onClick={() => setTab({ kind: 'admins' })}
              >
                Admin Users
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <main className="admin-main">
        {error && <p className="admin-status error">{error}</p>}

        {tab.kind === 'page' && activePage && <AdminPagesEditor page={activePage} />}
        {tab.kind === 'ticker' && <AdminSettingsEditor />}
        {tab.kind === 'media' && <AdminMediaLibrary />}
        {tab.kind === 'leads' && (
          <section className="admin-block">
            <h2>AI Chat Leads</h2>
            <p>Contact details captured from the AI assistant conversations.</p>
            <AdminLeadsPanel />
          </section>
        )}
        {tab.kind === 'admins' && <AdminAllowlistEditor />}
      </main>
    </div>
  )
}
