import { useEffect, useState } from 'react'
import {
  DEFAULT_MARKETING_TICKER_TEXT,
  fetchTickerTextFromSupabase,
  normalizeTickerText,
  persistTickerToSupabase,
} from '../../lib/marketingTicker'

export function AdminSettingsEditor() {
  const [tickerText, setTickerText] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    let alive = true
    fetchTickerTextFromSupabase()
      .then((value) => {
        if (!alive) return
        setTickerText(value ?? DEFAULT_MARKETING_TICKER_TEXT)
      })
      .catch((err) => alive && setErrorMsg(err?.message ?? 'Load failed'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = normalizeTickerText(tickerText)
    if (!normalized) {
      setStatus('error')
      setErrorMsg('Please enter a non-empty text.')
      return
    }
    setSaving(true)
    setErrorMsg('')
    try {
      await persistTickerToSupabase(normalized)
      setTickerText(normalized)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2500)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleReset() {
    setSaving(true)
    setErrorMsg('')
    try {
      await persistTickerToSupabase(DEFAULT_MARKETING_TICKER_TEXT)
      setTickerText(DEFAULT_MARKETING_TICKER_TEXT)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2500)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Reset failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="admin-block">
      <h2>Marketing Highlight Bar</h2>
      <p>Stored in Supabase (<code>cms_settings.marketing_ticker</code>) — every visitor sees changes instantly.</p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <form className="admin-form" onSubmit={handleSave}>
          <label htmlFor="marketingTickerText">Highlight text</label>
          <textarea
            id="marketingTickerText"
            rows={4}
            maxLength={260}
            value={tickerText}
            onChange={(e) => {
              setTickerText(e.target.value)
              setStatus('idle')
            }}
            placeholder="Enter the marketing highlights for the moving strip"
          />
          <div className="admin-form-actions">
            <button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save text'}
            </button>
            <button type="button" className="secondary" onClick={handleReset} disabled={saving}>
              Reset default
            </button>
          </div>
          {status === 'saved' && <p className="admin-status success">Saved successfully.</p>}
          {status === 'error' && <p className="admin-status error">{errorMsg}</p>}
        </form>
      )}
    </section>
  )
}
