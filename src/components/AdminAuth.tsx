import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { isEmailAllowed } from '../lib/cmsApi'
import type { User } from '@supabase/supabase-js'

type AdminAuthProps = {
  children: React.ReactNode
}

type Step = 'email' | 'otp'

export function AdminAuth({ children }: AdminAuthProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [infoMsg, setInfoMsg] = useState('')

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    async function verifyAndSet(currentUser: User | null) {
      if (!currentUser) {
        setUser(null)
        setLoading(false)
        return
      }
      const allowed = await isEmailAllowed(currentUser.email ?? '')
      if (!allowed) {
        await supabase!.auth.signOut()
        setUser(null)
        setErrorMsg('This email is not authorized for admin access.')
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      void verifyAndSet(session?.user ?? null)
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      void verifyAndSet(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSendOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return
    setErrorMsg('')
    setInfoMsg('')

    const normalized = email.trim().toLowerCase()
    const allowed = await isEmailAllowed(normalized)
    if (!allowed) {
      setErrorMsg('This email is not authorized for admin access.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: { shouldCreateUser: true },
    })
    setSubmitting(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    setStep('otp')
    setInfoMsg(`We sent a 6-digit code to ${normalized}. Check your inbox.`)
  }

  async function handleVerifyOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return
    setErrorMsg('')
    setInfoMsg('')

    const code = otp.trim()
    if (code.length < 6) {
      setErrorMsg('Please enter the code from your email.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code,
      type: 'email',
    })
    setSubmitting(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }
  }

  function handleChangeEmail() {
    setStep('email')
    setOtp('')
    setErrorMsg('')
    setInfoMsg('')
  }

  if (loading) {
    return (
      <main className="content-shell admin-page" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p>Loading...</p>
      </main>
    )
  }

  if (!supabase) {
    return (
      <main className="content-shell admin-page" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p>Supabase is not configured. Admin panel is unavailable.</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="content-shell admin-page" style={{ maxWidth: 480, margin: '0 auto', padding: '4rem 1rem' }}>
        <h1 style={{ textAlign: 'center' }}>Admin Access</h1>
        <p style={{ textAlign: 'center', margin: '1rem 0 2rem' }}>
          Sign in with your authorized admin email. We will send you a one-time code.
        </p>

        {step === 'email' && (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label htmlFor="adminEmail">Email address</label>
            <input
              id="adminEmail"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ padding: '0.75rem', fontSize: '1rem' }}
            />
            <button type="submit" disabled={submitting} style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
              {submitting ? 'Sending code…' : 'Send code'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label htmlFor="adminOtp">Code from email</label>
            <input
              id="adminOtp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={8}
              autoComplete="one-time-code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="12345678"
              style={{ padding: '0.75rem', fontSize: '1.25rem', letterSpacing: '0.5rem', textAlign: 'center' }}
            />
            <button type="submit" disabled={submitting} style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
              {submitting ? 'Verifying…' : 'Verify & sign in'}
            </button>
            <button type="button" className="secondary" onClick={handleChangeEmail}>
              Use a different email
            </button>
          </form>
        )}

        {infoMsg && <p className="admin-status success" style={{ marginTop: '1.5rem' }}>{infoMsg}</p>}
        {errorMsg && <p className="admin-status error" style={{ marginTop: '1.5rem' }}>{errorMsg}</p>}
      </main>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem 1rem', gap: '0.75rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.875rem', opacity: 0.75 }}>Signed in as {user.email}</span>
        <button type="button" className="secondary" onClick={() => supabase!.auth.signOut()}>
          Sign out
        </button>
      </div>
      {children}
    </>
  )
}
