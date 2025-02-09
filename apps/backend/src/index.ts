import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import type { CustomContext, CustomEnv } from '~/types/locals'
import { userRouter } from '~/routes/userRouter'
import { boardRouter, nonAuthBoardRouter } from '~/routes/boardRouter'
import { issueRouter, nonAuthIssueRouter } from '~/routes/issueRouter'
import { companyRouter } from '~/routes/companyRouter'
import { authGuardMiddleware } from '~/middlewares/authGuardMiddleware'
import { userMiddleware } from '~/middlewares/userMiddleware'
import { authRouter } from '~/routes/authRouter'

const port = 4000
const app = new Hono<CustomEnv>()

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

if (process.env.NODE_ENV === 'localhost') {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`)
}

app.route('/auth', authRouter)
app.route('/boards', nonAuthBoardRouter)
app.route('/issues', nonAuthIssueRouter)

app.use('*', authGuardMiddleware)
app.use('*', userMiddleware)

app.route('/users', userRouter)
app.route('/boards', boardRouter)
app.route('/issues', issueRouter)
app.route('/companies', companyRouter)

app.onError((e, c: CustomContext) => {
  console.error('Error:', e)
  return c.text('Internal Server Error', 500)
})

serve({
  fetch: app.fetch,
  port,
})
