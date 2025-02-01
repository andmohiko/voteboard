import type { NextPage } from 'next'

import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { LoginContainer } from '~/features/auth/components/LoginContainer'

const LoginPage: NextPage = () => {
  return (
    <DefaultLayout>
      <LoginContainer />
    </DefaultLayout>
  )
}

export default LoginPage
