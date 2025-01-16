import { z } from 'zod'
import type { User } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const updateUserParamsSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  companyId: z.string().nullable().optional(),
  isBanned: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
})

export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>

export const updateUserOperation = async (
  params: UpdateUserParams,
): Promise<User> => {
  const prismaUser = await prismaClient.user.update({
    where: {
      id: params.id,
    },
    data: {
      email: params.email,
      name: params.name,
      companyId: params.companyId,
      isBanned: params.isBanned,
      isDeleted: params.isDeleted,
    },
  })
  const user: User = {
    ...prismaUser,
    createdAt: prismaUser.createdAt.toISOString(),
    updatedAt: prismaUser.updatedAt.toISOString(),
  }
  return user
}
