import type { ExternalAuthor } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export type FindExternalAuthorParams = {
  id: string
}

export const findExternalAuthorByIdOperation = async (
  params: FindExternalAuthorParams,
): Promise<ExternalAuthor | null> => {
  const prismaExternalAuthor = await prismaClient.externalAuthor.findFirst({
    where: {
      id: params.id,
    },
  })
  if (!prismaExternalAuthor) {
    return null
  }

  const externalAuthor: ExternalAuthor = {
    ...prismaExternalAuthor,
    createdAt: prismaExternalAuthor.createdAt.toISOString(),
    updatedAt: prismaExternalAuthor.updatedAt.toISOString(),
  }
  return externalAuthor
}
