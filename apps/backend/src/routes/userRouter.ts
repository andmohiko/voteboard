import { Hono } from 'hono'

import { findUserByIdOperation } from '~/features/user/operations/findUserByIdOperation'
import {
  updateUserOperation,
  updateUserParamsSchema,
} from '~/features/user/operations/updateUserOperation'
import type { CustomContext, CustomEnv } from '~/types/locals'

const userRouter = new Hono<CustomEnv>()

userRouter.get('/', (c: CustomContext) => {
  const data = c.get('user')
  return c.json(data)
})

userRouter.get('/:id', async (c: CustomContext) => {
  const id = c.req.param('id')
  const data = await findUserByIdOperation({ id })
  if (!data) {
    return c.text('User not found', 404)
  }

  return c.json(data)
})

userRouter.put('/:id', async (c: CustomContext) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const result = updateUserParamsSchema.safeParse({
    ...body,
    id,
  })

  if (!result.success) {
    return c.json(result.error, 400)
  }

  const user = await updateUserOperation(result.data)

  return c.json(user)
})

export { userRouter }
