import type { BoardWithIssuesWithVoteCount } from '@voteboard/common'
import useSWR from 'swr'

import { apiUrl } from '~/lib/api'
import { fetcher } from '~/utils/fetcher'

const boardKey = (id: string) => `${apiUrl}/boards/${id}`

export const useBoard = (
  id: string,
): [BoardWithIssuesWithVoteCount | null, boolean] => {
  const { data, isLoading } = useSWR<BoardWithIssuesWithVoteCount>(
    boardKey(id),
    fetcher,
  )

  if (!data) {
    return [null, isLoading]
  }

  return [data, isLoading]
}
