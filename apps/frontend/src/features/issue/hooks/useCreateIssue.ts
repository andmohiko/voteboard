import { apiUrl } from '~/lib/api'
import type { EditIssueInputType } from '~/features/issue/types'
import { createIssueRequestSchema } from '~/features/issue/types'

const issueKey = (id: string) => `${apiUrl}/boards/${id}/issues`

export const useCreateIssue = (boardId: string) => {
  const createIssue = async (data: EditIssueInputType): Promise<void> => {
    const parsedData = createIssueRequestSchema.safeParse({
      ...data,
      status: 'BACKLOG',
      genre: 'FEATURE_REQUEST',
    })
    if (!parsedData.success) {
      console.error(parsedData.error.errors)
      throw new Error('入力内容に誤りがあります')
    }

    const response = await fetch(issueKey(boardId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedData.data),
    })

    if (!response.ok) {
      throw new Error('ボードの作成に失敗しました')
    }
  }

  return { createIssue }
}
