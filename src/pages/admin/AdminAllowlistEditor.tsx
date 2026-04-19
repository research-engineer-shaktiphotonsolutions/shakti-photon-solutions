import { useEffect, useState } from 'react'
import { addAllowedEmail, fetchAllowedEmails, removeAllowedEmail } from '../../lib/cmsApi'

type Row = { id: string; email: string; note: string | null }

export function AdminAllowlistEditor() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState('')
  const [newNote, setNewNote] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function refresh() {
    setLoading(true)
    setError('')
    try {
      setRows(await fetchAllowedEmails())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!newEmail.trim()) return
    setBusy(true)
    setError('')
    try {
      await addAllowedEmail(newEmail, newNote)
      setNewEmail('')
      setNewNote('')
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Add failed')
    } finally {
      setBusy(false)
    }
  }

  async function handleRemove(id: string, email: string) {
    if (!confirm(`Remove admin access for ${email}?`)) return
    setBusy(true)
    try {
      await removeAllowedEmail(id)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Remove failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="admin-block">
      <h2>Admin Users</h2>
      <p>Emails allowed to sign in to <code>/admin</code>. Stored in <code>admin_allowed_emails</code>.</p>

      <form className="admin-form" onSubmit={handleAdd}>
        <label htmlFor="newAdminEmail">New admin email</label>
        <input
          id="newAdminEmail"
          type="email"
          required
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="person@example.com"
        />
        <label htmlFor="newAdminNote">Note (optional)</label>
        <input
          id="newAdminNote"
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="e.g. Marketing lead"
        />
        <div className="admin-form-actions">
          <button type="submit" disabled={busy}>{busy ? 'Working…' : 'Add admin'}</button>
        </div>
        {error && <p className="admin-status error">{error}</p>}
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.email}</td>
                <td>{r.note ?? '—'}</td>
                <td>
                  <button type="button" className="secondary" onClick={() => handleRemove(r.id, r.email)} disabled={busy}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3}>No admins yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  )
}
