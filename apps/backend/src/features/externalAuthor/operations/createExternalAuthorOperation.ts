import { z } from 'zod'
import type { ExternalAuthor } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const createExternalAuthorParamsSchema = z.object({
  email: z.string().email(),
  name: z.string().nullable(),
  companyName: z.string().nullable(),
})

export type CreateExternalAuthorParams = z.infer<
  typeof createExternalAuthorParamsSchema
>

export const createExternalAuthorOperation = async (
  params: CreateExternalAuthorParams,
): Promise<ExternalAuthor> => {
  const prismaExternalAuthor = await prismaClient.externalAuthor.create({
    data: {
      email: params.email,
      name: params.name,
      companyName: params.companyName,
    },
  })
  const externalAuthor: ExternalAuthor = {
    ...prismaExternalAuthor,
    createdAt: prismaExternalAuthor.createdAt.toISOString(),
    updatedAt: prismaExternalAuthor.updatedAt.toISOString(),
  }
  return externalAuthor
}
