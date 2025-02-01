import { z } from 'zod'
import type { User } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const createUserParamsSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  name: z.string(),
  companyId: z.string().nullable(),
})

export type CreateUserParams = z.infer<typeof createUserParamsSchema>

export const createUserOperation = async (
  params: CreateUserParams,
): Promise<User> => {
  const prismaUser = await prismaClient.user.create({
    data: {
      uid: params.uid,
      email: params.email,
      name: params.name,
      company: params.companyId
        ? {
            connect: {
              id: params.companyId,
            },
          }
        : {},
    },
  })
  const user: User = {
    ...prismaUser,
    createdAt: prismaUser.createdAt.toISOString(),
    updatedAt: prismaUser.updatedAt.toISOString(),
  }
  return user
}
