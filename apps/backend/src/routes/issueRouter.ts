import { Hono } from 'hono'

import {
  createVoteOperation,
  createVoteParamsSchema,
} from '~/features/vote/operations/createVoteOperation'
import { deleteVoteOperation } from '~/features/vote/operations/deleteVoteOperation'
import type { CustomContext, CustomEnv } from '~/types/locals'

const issueRouter = new Hono<CustomEnv>()

issueRouter.post('/:id/vote', async (c: CustomContext) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const result = createVoteParamsSchema.safeParse({
    ...body,
    issueId: id,
  })

  if (!result.success) {
    return c.json(result.error, 400)
  }

  const vote = await createVoteOperation(result.data)

  return c.json(vote)
})

issueRouter.delete('/:id/vote/:voteId', async (c: CustomContext) => {
  const voteId = c.req.param('voteId')
  const vote = await deleteVoteOperation({
    id: voteId,
  })

  return c.json(vote)
})

export { issueRouter }
