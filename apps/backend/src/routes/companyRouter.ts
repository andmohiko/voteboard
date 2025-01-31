import { Hono } from 'hono'

import {
  createCompanyOperation,
  createCompanyParamsSchema,
} from '~/features/company/operations/createCompanyOperation'
import type { CustomContext, CustomEnv } from '~/types/locals'

const companyRouter = new Hono<CustomEnv>()

companyRouter.post('/', async (c: CustomContext) => {
  const result = createCompanyParamsSchema.safeParse({
    name: '株式会社スーパーハムスター',
  })
  if (!result.success) {
    return c.json(result.error, 400)
  }
  const company = await createCompanyOperation(result.data)
  return c.json(company)
})

export { companyRouter }
