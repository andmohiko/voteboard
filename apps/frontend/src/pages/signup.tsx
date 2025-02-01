import type { NextPage } from 'next'

import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { SignUpContainer } from '~/features/auth/components/SignUpContainer'

const SignUpPage: NextPage = () => {
  return (
    <DefaultLayout>
      <SignUpContainer />
    </DefaultLayout>
  )
}

export default SignUpPage
