import type { ReactNode } from 'react'
import { createContext, useState, useContext, useEffect } from 'react'
import type { Session, User } from '@supabase/supabase-js'

import { supabase } from '~/lib/supabase'

const AuthContext = createContext<{
  session: Session | null
  user: User | null | undefined
  signOut: () => Promise<void>
}>({
  session: null,
  user: undefined,
  signOut: async () => {},
})

const AuthProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Failed to get session:', error.message)
      } else {
        setSession(data.session)
        setUser(data.session?.user ?? null)
      }
    }

    // 初回ロード時にユーザー情報を取得
    void fetchUser()

    // 認証状態の変更を監視
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // eslint-disable-next-line no-console
        console.log(`Auth state changed: ${event}`)
        setSession(session)
        setUser(session?.user ?? null)
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ session, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

export const useAuthContext = () => useContext(AuthContext)
