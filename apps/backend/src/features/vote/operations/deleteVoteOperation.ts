import { z } from 'zod'
import type { Vote } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const deleteVoteParamsSchema = z.object({
  id: z.string(),
})

export type DeleteVoteParams = z.infer<typeof deleteVoteParamsSchema>

export const deleteVoteOperation = async (
  params: DeleteVoteParams,
): Promise<Vote> => {
  const prismaVote = await prismaClient.vote.delete({
    where: {
      id: params.id,
    },
  })
  const vote: Vote = {
    ...prismaVote,
    createdAt: prismaVote.createdAt.toISOString(),
    updatedAt: prismaVote.updatedAt.toISOString(),
  }
  return vote
}
