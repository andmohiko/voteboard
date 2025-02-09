import type { IssueStatus, IssueWithVoteCount } from '@voteboard/common'

import { apiUrl } from '~/lib/api'
import { updateIssueStatusRequestSchema } from '~/features/issue/types'

const issueKey = (boardId: string, issueId: string) =>
  `${apiUrl}/boards/${boardId}/issues/${issueId}`

export const useIssueStatusMutation = (boardId: string) => {
  const onMoveIssue = async (
    issue: IssueWithVoteCount,
    status: IssueStatus,
  ): Promise<void> => {
    const parsedData = updateIssueStatusRequestSchema.safeParse({
      id: issue.id,
      status,
    })
    if (!parsedData.success) {
      console.error(parsedData.error.errors)
      throw new Error('再度ログインしてください')
    }

    const response = await fetch(issueKey(boardId, issue.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedData.data),
    })

    if (!response.ok) {
      throw new Error('投票に失敗しました')
    }
  }

  return { onMoveIssue }
}
