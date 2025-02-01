import type { NextPage } from 'next'

import { DefaultLayout } from '~/components/Layouts/DefaultLayout'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <p>メールを承認してください</p>
    </DefaultLayout>
  )
}

export default Home
