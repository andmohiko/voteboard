import { z } from 'zod'
import type { Board } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const updateBoardParamsSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  isArchived: z.boolean().optional(),
  companyId: z.string().optional(),
})

export type UpdateBoardParams = z.infer<typeof updateBoardParamsSchema>

export const updateBoardOperation = async (
  params: UpdateBoardParams,
): Promise<Board> => {
  const prismaBoard = await prismaClient.board.update({
    where: {
      id: params.id,
    },
    data: {
      title: params.title,
      description: params.description,
      isArchived: params.isArchived,
      companyId: params.companyId,
    },
  })
  const board: Board = {
    ...prismaBoard,
    createdAt: prismaBoard.createdAt.toISOString(),
    updatedAt: prismaBoard.updatedAt.toISOString(),
  }
  return board
}
