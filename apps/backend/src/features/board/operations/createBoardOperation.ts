import { z } from 'zod'
import type { Board } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const createBoardParamsSchema = z.object({
  title: z.string(),
  description: z.string(),
  companyId: z.string(),
})

export type CreateBoardParams = z.infer<typeof createBoardParamsSchema>

export const createBoardOperation = async (
  params: CreateBoardParams,
): Promise<Board> => {
  const prismaBoard = await prismaClient.board.create({
    data: {
      title: params.title,
      description: params.description,
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
