import type { Board } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export type FindBoardsByCompanyIdParams = {
  companyId: string
}

export const findBoardsByCompanyIdOperation = async (
  params: FindBoardsByCompanyIdParams,
): Promise<Array<Board>> => {
  const prismaBoards = await prismaClient.board.findMany({
    where: {
      companyId: params.companyId,
    },
  })

  const boards: Array<Board> = prismaBoards.map((prismaBoard) => ({
    ...prismaBoard,
    createdAt: prismaBoard.createdAt.toISOString(),
    updatedAt: prismaBoard.updatedAt.toISOString(),
  }))
  return boards
}
