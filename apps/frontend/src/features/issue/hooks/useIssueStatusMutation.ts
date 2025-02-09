import type { IssueStatus, IssueWithVoteCount } from '@voteboard/common'

import { apiUrl } from '~/lib/api'
import { updateIssueStatusRequestSchema } from '~/features/issue/types'
import { useAuthContext } from '~/providers/AuthProvider'

const issueKey = (boardId: string, issueId: string) =>
  `${apiUrl}/boards/${boardId}/issues/${issueId}`

export const useIssueStatusMutation = (boardId: string) => {
  const { session } = useAuthContext()
  const onMoveIssue = async (
    issue: IssueWithVoteCount,
    status: IssueStatus,
  ): Promise<void> => {
    if (!session) {
      throw new Error('再度ログインしてください')
    }
    const parsedData = updateIssueStatusRequestSchema.safeParse({
      id: issue.id,
      status,
    })
    if (!parsedData.success) {
      console.error('Error:', parsedData.error)
      throw new Error('ステータスの変更に失敗しました')
    }

    const response = await fetch(issueKey(boardId, issue.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(parsedData.data),
    })

    if (!response.ok) {
      throw new Error('投票に失敗しました')
    }
  }

  return { onMoveIssue }
}
