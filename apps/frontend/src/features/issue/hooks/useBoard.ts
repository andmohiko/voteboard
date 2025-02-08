import type { BoardWithIssuesWithVoteCount } from '@voteboard/common'
import type { KeyedMutator } from 'swr'
import useSWR from 'swr'

import { apiUrl } from '~/lib/api'
import { fetcher } from '~/utils/fetcher'

const boardKey = (id: string) => `${apiUrl}/boards/${id}`

export const useBoard = (
  id: string,
): [
  BoardWithIssuesWithVoteCount | null,
  boolean,
  KeyedMutator<BoardWithIssuesWithVoteCount> | null,
] => {
  const { data, isLoading, mutate } = useSWR<BoardWithIssuesWithVoteCount>(
    boardKey(id),
    fetcher,
  )

  if (!data) {
    return [null, isLoading, null]
  }

  return [data, isLoading, mutate]
}
