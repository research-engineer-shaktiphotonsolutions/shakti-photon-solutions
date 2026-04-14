import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

const AUTHORIZED_EMAILS = [
  'info@shaktiphotonsolutions.com',
  'sahgya9@gmail.com',
  'gs.engineer.rdshaktiphoton@gmail.com',
]

type AdminAuthProps = {
  children: React.ReactNode
}

export function AdminAuth({ children }: AdminAuthProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      setLoading(false)

      if (currentUser && !AUTHORIZED_EMAILS.includes(currentUser.email ?? '')) {
        setUnauthorized(true)
        supabase.auth.signOut()
      } else {
        setUnauthorized(false)
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      setLoading(false)

      if (currentUser && !AUTHORIZED_EMAILS.includes(currentUser.email ?? '')) {
        setUnauthorized(true)
        supabase.auth.signOut()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleGoogleSignIn() {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/admin',
      },
    })
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
      <main className="content-shell admin-page" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1>Admin Access</h1>
        <p style={{ margin: '1rem 0 2rem' }}>Sign in with an authorized Google account to continue.</p>

        {unauthorized && (
          <p className="admin-status error" style={{ marginBottom: '1.5rem' }}>
            Your Google account is not authorized for admin access.
          </p>
        )}

        <button type="button" onClick={handleGoogleSignIn} style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
          Sign in with Google
        </button>
      </main>
    )
  }

  return <>{children}</>
}
