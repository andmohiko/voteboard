import { z } from 'zod'
import type { Company } from '@voteboard/common'

import { prismaClient } from '~/lib/prisma'

export const createCompanyParamsSchema = z.object({
  name: z.string(),
})

export type CreateCompanyParams = z.infer<typeof createCompanyParamsSchema>

export const createCompanyOperation = async (
  params: CreateCompanyParams,
): Promise<Company> => {
  const prismaCompany = await prismaClient.company.create({
    data: {
      name: params.name,
    },
  })
  const company: Company = {
    ...prismaCompany,
    createdAt: prismaCompany.createdAt.toISOString(),
    updatedAt: prismaCompany.updatedAt.toISOString(),
  }
  return company
}
