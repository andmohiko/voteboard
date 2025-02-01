import type { Board } from '@voteboard/common'
import useSWR from 'swr'

import { apiUrl } from '~/lib/api'
import { fetcher } from '~/utils/fetcher'

const boardsKey = `${apiUrl}/boards`

export const useBoards = (): [Array<Board>, boolean] => {
  const { data, isLoading } = useSWR<Array<Board>>(boardsKey, fetcher)

  const boards = data ?? []

  return [boards, isLoading]
}
