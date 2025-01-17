import type { BoardWithIssuesWithVoteCount } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export type FindBoardParams = {
  id: string
}

export const findBoardByIdOperation = async (
  params: FindBoardParams,
): Promise<BoardWithIssuesWithVoteCount | null> => {
  const prismaBoard = await prismaClient.board.findFirst({
    where: {
      id: params.id,
    },
    include: {
      issues: {
        include: {
          votes: true,
        },
      },
    },
  })
  if (!prismaBoard) {
    return null
  }

  const board: BoardWithIssuesWithVoteCount = {
    ...prismaBoard,
    createdAt: prismaBoard.createdAt.toISOString(),
    updatedAt: prismaBoard.updatedAt.toISOString(),
    issues: prismaBoard.issues.map((prismaIssue) => ({
      ...prismaIssue,
      createdAt: prismaIssue.createdAt.toISOString(),
      updatedAt: prismaIssue.updatedAt.toISOString(),
      voteCount: prismaIssue.votes.length,
    })),
  }
  return board
}
