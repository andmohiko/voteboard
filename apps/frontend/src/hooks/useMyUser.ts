import type { User } from '@voteboard/common'
import useSWR from 'swr'

import { apiUrl } from '~/lib/api'
import { useAuthContext } from '~/providers/AuthProvider'
import { fetcher } from '~/utils/fetcher'

const usersKey = `${apiUrl}/users`

export const useMyUser = (): {
  user: User | null
  isLoading: boolean
} => {
  const { session } = useAuthContext()
  const { data, isLoading } = useSWR<User>(
    session?.access_token ? [usersKey, session.access_token] : null,
    ([url, idToken]: [string, string]) => fetcher(url, idToken),
  )

  if (!data) {
    return {
      user: null,
      isLoading,
    }
  }

  return {
    user: data,
    isLoading,
  }
}
