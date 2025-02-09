import type { Board } from '@voteboard/common'
import useSWR from 'swr'

import { apiUrl } from '~/lib/api'
import { useAuthContext } from '~/providers/AuthProvider'
import { fetcher } from '~/utils/fetcher'

const boardsKey = `${apiUrl}/boards`

export const useBoards = (): [Array<Board>, boolean] => {
  const { session } = useAuthContext()
  const { data, isLoading } = useSWR<Array<Board>>(
    session?.access_token ? [boardsKey, session.access_token] : null,
    ([url, idToken]: [string, string]) => fetcher(url, idToken),
  )

  const boards = data ?? []

  return [boards, isLoading]
}
