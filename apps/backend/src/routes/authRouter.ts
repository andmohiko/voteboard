import { Hono } from 'hono'

import {
  createUserOperation,
  createUserParamsSchema,
} from '~/features/user/operations/createUserOperation'
import type { CustomContext, CustomEnv } from '~/types/locals'

const authRouter = new Hono<CustomEnv>()

authRouter.post('/register', async (c: CustomContext) => {
  const body = await c.req.json()
  const result = createUserParamsSchema.safeParse({
    ...body,
    companyId: process.env.COMPANY_ID!,
  })

  if (!result.success) {
    return c.json(result.error, 400)
  }

  const user = await createUserOperation(result.data)

  return c.json(user)
})

export { authRouter }
