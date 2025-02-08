import type { IssueWithVoteCount } from '@voteboard/common'

import { apiUrl } from '~/lib/api'
import { createVoteRequestSchema } from '~/features/issue/types'
import { useAuthContext } from '~/providers/AuthProvider'

const voteKey = (id: string) => `${apiUrl}/issues/${id}/vote`

export const useVoteMutation = () => {
  const { user } = useAuthContext()

  const onAddVote = async (issue: IssueWithVoteCount): Promise<void> => {
    if (!user) {
      throw new Error('再度ログインしてください')
    }
    const parsedData = createVoteRequestSchema.safeParse({
      userId: user.id,
    })
    if (!parsedData.success) {
      console.error(parsedData.error.errors)
      throw new Error('再度ログインしてください')
    }

    const response = await fetch(voteKey(issue.id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedData.data),
    })

    if (!response.ok) {
      throw new Error('投票に失敗しました')
    }
  }

  return { onAddVote }
}
