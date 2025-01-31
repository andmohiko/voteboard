import { z } from 'zod'
import type { Issue } from '@voteboard/common'
import { issueGenreSchema, issueStatusSchema } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const updateIssueParamsSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: issueStatusSchema.optional(),
  genre: issueGenreSchema.optional(),
  isDeleted: z.boolean().optional(),
})

export type UpdateIssueParams = z.infer<typeof updateIssueParamsSchema>

export const updateIssueOperation = async (
  params: UpdateIssueParams,
): Promise<Issue> => {
  const prismaIssue = await prismaClient.issue.update({
    where: {
      id: params.id,
    },
    data: {
      title: params.title,
      description: params.description,
      status: params.status,
      genre: params.genre,
      isDeleted: params.isDeleted,
    },
  })
  const issue: Issue = {
    ...prismaIssue,
    createdAt: prismaIssue.createdAt.toISOString(),
    updatedAt: prismaIssue.updatedAt.toISOString(),
  }
  return issue
}
