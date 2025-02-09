import type { User } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const findByEmail = async (email: string): Promise<User | null> => {
  const prismaUser = await prismaClient.user.findFirst({
    where: {
      email,
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
