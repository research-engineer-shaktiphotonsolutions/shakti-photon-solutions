import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Lead = {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  organization: string | null
  requirement: string | null
  source_page: string | null
  chat_summary: string | null
  status: string
  created_at: string
}

export function AdminLeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchLeads() {
      if (!supabase) {
        setError('Supabase not configured')
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setLeads((data as Lead[]) || [])
      }
      setLoading(false)
    }

    fetchLeads()
  }, [])

  if (loading) return <p>Loading leads...</p>
  if (error) return <p className="admin-status error">{error}</p>
  if (leads.length === 0) return <p>No leads captured yet. Leads will appear here when visitors share their contact details via the AI assistant.</p>

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="admin-leads-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border, #ddd)', textAlign: 'left' }}>
            <th style={{ padding: '8px' }}>Date</th>
            <th style={{ padding: '8px' }}>Name</th>
            <th style={{ padding: '8px' }}>Email</th>
            <th style={{ padding: '8px' }}>Phone</th>
            <th style={{ padding: '8px' }}>Organization</th>
            <th style={{ padding: '8px' }}>Requirement</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-border, #eee)' }}>
              <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
              <td style={{ padding: '8px' }}>{lead.name || '—'}</td>
              <td style={{ padding: '8px' }}>
                {lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : '—'}
              </td>
              <td style={{ padding: '8px' }}>{lead.phone || '—'}</td>
              <td style={{ padding: '8px' }}>{lead.organization || '—'}</td>
              <td style={{ padding: '8px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {lead.requirement || '—'}
              </td>
              <td style={{ padding: '8px' }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: lead.status === 'new' ? '#e0f2fe' : '#e0e7ff',
                  color: lead.status === 'new' ? '#0369a1' : '#4338ca',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}>
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
