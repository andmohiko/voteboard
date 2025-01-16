import type { User } from '@voteboard/common'
import type { Context, Env } from 'hono'

export type CustomEnv = Env & {
  Variables: {
    uid?: string
    email?: string
    user?: User
  }
}

export type CustomContext = Context<CustomEnv>
