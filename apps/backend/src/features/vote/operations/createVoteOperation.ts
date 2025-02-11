import { z } from 'zod'
import type { Vote } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const createVoteParamsSchema = z.object({
  issueId: z.string(),
  uid: z.string().optional(),
  externalAuthorId: z.string().optional(),
})

export type CreateVoteParams = z.infer<typeof createVoteParamsSchema>

export const createVoteOperation = async (
  params: CreateVoteParams,
): Promise<Vote> => {
  const prismaVote = await prismaClient.vote.create({
    data: {
      issue: {
        connect: {
          id: params.issueId,
        },
      },
      user: {
        connect: {
          uid: params.uid,
        },
      },
      // externalAuthor: {
      //   connect: {
      //     id: params.externalAuthorId,
      //   },
      // },
    },
  })
  const vote: Vote = {
    ...prismaVote,
    createdAt: prismaVote.createdAt.toISOString(),
    updatedAt: prismaVote.updatedAt.toISOString(),
  }
  return vote
}
