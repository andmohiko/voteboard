import { z } from 'zod'
import type { Issue } from '@voteboard/common'
import { issueGenreSchema, issueStatusSchema } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const createIssueParamsSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: issueStatusSchema,
  genre: issueGenreSchema,
  boardId: z.string(),
})

export type CreateIssueParams = z.infer<typeof createIssueParamsSchema>

export const createIssueOperation = async (
  params: CreateIssueParams,
): Promise<Issue> => {
  const prismaIssue = await prismaClient.issue.create({
    data: {
      title: params.title,
      description: params.description,
      status: params.status,
      genre: params.genre,
      boardId: params.boardId,
    },
  })
  const issue: Issue = {
    ...prismaIssue,
    createdAt: prismaIssue.createdAt.toISOString(),
    updatedAt: prismaIssue.updatedAt.toISOString(),
  }
  return issue
}
