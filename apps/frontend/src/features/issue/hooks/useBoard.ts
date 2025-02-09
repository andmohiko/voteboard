import type { BoardWithIssuesWithVoteCount } from '@voteboard/common'
import type { KeyedMutator } from 'swr'
import useSWR from 'swr'

import { useMyUser } from '~/hooks/useMyUser'
import { apiUrl } from '~/lib/api'
import { fetcher } from '~/utils/fetcher'

const boardKey = (id: string) => `${apiUrl}/boards/${id}`

export const useBoard = (
  id: string,
): {
  board: BoardWithIssuesWithVoteCount | null
  isLoading: boolean
  mutate: KeyedMutator<BoardWithIssuesWithVoteCount> | null
  canEditBoard: boolean
} => {
  const { user } = useMyUser()
  const { data, isLoading, mutate } = useSWR<BoardWithIssuesWithVoteCount>(
    boardKey(id),
    fetcher,
  )

  if (!data) {
    return {
      board: null,
      isLoading,
      mutate,
      canEditBoard: false,
    }
  }

  const canEditBoard = user ? user.companyId === data.companyId : false

  return {
    board: data,
    isLoading,
    mutate,
    canEditBoard,
  }
}
