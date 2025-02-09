import type { Next } from 'hono'

import { findByEmail } from '~/features/user/operations/findByEmail'
import type { CustomContext } from '~/types/locals'

export const userMiddleware = async (c: CustomContext, next: Next) => {
  const email = c.get('email')
  if (!email) {
    return c.json({}, 401)
  }
  const user = await findByEmail(email)

  if (!user) {
    return c.json({ error: 'Not found user!' }, 403)
  }

  c.set('user', user)

  await next()
}
