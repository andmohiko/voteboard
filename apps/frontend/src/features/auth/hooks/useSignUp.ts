import { useRouter } from 'next/router'

import { apiUrl } from '~/lib/api'
import { supabase } from '~/lib/supabase'

const usersKey = `${apiUrl}/users`

export const useSignUp = () => {
  const { push } = useRouter()

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    console.log('data', data, error)

    if (error) {
      if (error.message.includes('User already registered')) {
        throw new Error('このメールアドレスはすでに登録されています')
      }
      throw new Error(error.message)
    }

    const user = data.user
    if (!user) {
      throw new Error('ユーザー情報の取得に失敗しました')
    }

    const res = await fetch(usersKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user.id,
        email: user.email,
        name: user.email,
      }),
    })

    if (!res.ok) {
      throw new Error('ユーザー登録に失敗しました')
    }

    await push('/confirm_email')
  }

  return {
    signUp,
  }
}
