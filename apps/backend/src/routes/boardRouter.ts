import { Hono } from 'hono'

import {
  createBoardOperation,
  createBoardParamsSchema,
} from '~/features/board/operations/createBoardOperation'
import { findBoardByIdOperation } from '~/features/board/operations/findBoardByIdOperation'
import {
  updateBoardOperation,
  updateBoardParamsSchema,
} from '~/features/board/operations/updateBoardOperation'
import type { CustomContext, CustomEnv } from '~/types/locals'

const boardRouter = new Hono<CustomEnv>()

boardRouter.get('/:id', async (c: CustomContext) => {
  const id = c.req.param('id')
  const data = await findBoardByIdOperation({ id })
  if (!data) {
    return c.text('Board not found', 404)
  }

  return c.json(data)
})

boardRouter.post('/', async (c: CustomContext) => {
  const companyId = '1'
  const body = await c.req.json()
  const result = createBoardParamsSchema.safeParse({
    ...body,
    companyId,
  })

  if (!result.success) {
    return c.json(result.error, 400)
  }

  const board = await createBoardOperation(result.data)

  return c.json(board)
})

boardRouter.put('/:id', async (c: CustomContext) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const result = updateBoardParamsSchema.safeParse({
    ...body,
    id,
  })

  if (!result.success) {
    return c.json(result.error, 400)
  }

  const board = await updateBoardOperation(result.data)

  return c.json(board)
})

export { boardRouter }
