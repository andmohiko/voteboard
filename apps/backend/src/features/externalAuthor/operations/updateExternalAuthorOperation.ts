import { z } from 'zod'
import type { ExternalAuthor } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const updateExternalAuthorParamsSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  companyName: z.string().nullable().optional(),
  isBanned: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
})

export type UpdateExternalAuthorParams = z.infer<
  typeof updateExternalAuthorParamsSchema
>

export const updateExternalAuthorOperation = async (
  params: UpdateExternalAuthorParams,
): Promise<ExternalAuthor> => {
  const prismaExternalAuthor = await prismaClient.externalAuthor.update({
    where: {
      id: params.id,
    },
    data: {
      email: params.email,
      name: params.name,
      companyName: params.companyName,
      isBanned: params.isBanned,
      isDeleted: params.isDeleted,
    },
  })
  const externalAuthor: ExternalAuthor = {
    ...prismaExternalAuthor,
    createdAt: prismaExternalAuthor.createdAt.toISOString(),
    updatedAt: prismaExternalAuthor.updatedAt.toISOString(),
  }
  return externalAuthor
}
