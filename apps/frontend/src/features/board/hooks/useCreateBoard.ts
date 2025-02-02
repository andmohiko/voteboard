import type { Board } from '@voteboard/common'

import { apiUrl } from '~/lib/api'
import type { EditBoardInputType } from '~/features/board/types'
import { editBoardSchema } from '~/features/board/types'

const boardsKey = `${apiUrl}/boards`

export const useCreateBoard = () => {
  const createBoard = async (data: EditBoardInputType): Promise<Board> => {
    const parsedData = editBoardSchema.safeParse({
      ...data,
    })
    if (!parsedData.success) {
      console.error(parsedData.error.errors)
      throw new Error('入力内容に誤りがあります')
    }

    const response = await fetch(boardsKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedData.data),
    })

    if (!response.ok) {
      throw new Error('ボードの作成に失敗しました')
    }

    const resData: Board = await response.json()
    const board: Board = {
      id: resData.id,
      title: resData.title,
      description: resData.description,
      isArchived: resData.isArchived,
      companyId: resData.companyId,
      createdAt: resData.createdAt,
      updatedAt: resData.updatedAt,
    }
    return board
  }

  return { createBoard }
}
