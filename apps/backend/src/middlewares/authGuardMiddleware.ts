import type { Next } from 'hono'

import { supabase } from '~/lib/supabase'
import type { CustomContext } from '~/types/locals'
import { errorMessage } from '~/utils/errorMessage'

export const authGuardMiddleware = async (c: CustomContext, next: Next) => {
  const authHeader = c.req.header('authorization')
  if (!authHeader) {
    return c.json({ error: 'No credentials sent!' }, 403)
  }

  // Authorization: Bearer <idToken>
  const idToken = authHeader.split(' ')[1]

  try {
    const { data, error } = await supabase.auth.getUser(idToken)
    if (error || !data.user) {
      throw new Error('Invalid token')
    }
    c.set('email', data.user.email)
  } catch (error) {
    return c.json(
      { error: `Invalid credentials sent! Error: ${errorMessage(error)}` },
      403,
    )
  }

  await next()
}
