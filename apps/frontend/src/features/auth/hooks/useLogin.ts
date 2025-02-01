import { useRouter } from 'next/router'

import type { LoginInputType } from '~/features/auth/types'
import { supabase } from '~/lib/supabase'

export const useLogin = () => {
  const { push } = useRouter()

  const login = async (data: LoginInputType) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      throw new Error(error.message)
    }

    await push('/')
  }

  return { login }
}
