import { Hono } from 'hono'

import {
  createBoardOperation,
  createBoardParamsSchema,
} from '~/features/board/operations/createBoardOperation'
import { findBoardByIdOperation } from '~/features/board/operations/findBoardByIdOperation'
import { findBoardsByCompanyIdOperation } from '~/features/board/operations/findBoardsByCompanyIdOperation'
import {
  updateBoardOperation,
  updateBoardParamsSchema,
} from '~/features/board/operations/updateBoardOperation'
import {
  createIssueOperation,
  createIssueParamsSchema,
} from '~/features/issue/operations/createIssueOperation'
import {
  updateIssueOperation,
  updateIssueParamsSchema,
} from '~/features/issue/operations/updateIssueOperation'
import type { CustomContext, CustomEnv } from '~/types/locals'

const boardRouter = new Hono<CustomEnv>()

boardRouter.get('/', async (c: CustomContext) => {
  const boards = await findBoardsByCompanyIdOperation({
    companyId: process.env.COMPANY_ID!,
  })
  return c.json(boards)
})

boardRouter.get('/:id', async (c: CustomContext) => {
  const id = c.req.param('id')
  const data = await findBoardByIdOperation({ id })
  if (!data) {
    return c.text('Board not found', 404)
  }

  return c.json(data)
})

boardRouter.post('/', async (c: CustomContext) => {
  const body = await c.req.json()
  const result = createBoardParamsSchema.safeParse({
    ...body,
    companyId: process.env.COMPANY_ID!,
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

boardRouter.post('/:id/issue', async (c: CustomContext) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const result = createIssueParamsSchema.safeParse({
    ...body,
    boardId: id,
  })

  if (!result.success) {
    return c.json(result.error, 400)
  }

  const issue = await createIssueOperation(result.data)

  return c.json(issue)
})

boardRouter.put('/:id/issue/:issueId', async (c: CustomContext) => {
  const issueId = c.req.param('issueId')
  const body = await c.req.json()
  const result = updateIssueParamsSchema.safeParse({
    ...body,
    id: issueId,
  })

  if (!result.success) {
    return c.json(result.error, 400)
  }

  const issue = await updateIssueOperation(result.data)

  return c.json(issue)
})

boardRouter.delete('/:id/issue/:issueId', async (c: CustomContext) => {
  const issueId = c.req.param('issueId')
  const issue = await updateIssueOperation({
    id: issueId,
    isDeleted: true,
  })

  return c.json(issue)
})

export { boardRouter }
