import type { User } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export type FindUserParams = {
  id: string
}

export const findUserByIdOperation = async (
  params: FindUserParams,
): Promise<User | null> => {
  const prismaUser = await prismaClient.user.findFirst({
    where: {
      id: params.id,
    },
  })
  if (!prismaUser) {
    return null
  }

  const user: User = {
    ...prismaUser,
    createdAt: prismaUser.createdAt.toISOString(),
    updatedAt: prismaUser.updatedAt.toISOString(),
  }
  return user
}
