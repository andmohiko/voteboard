import type { NextPage } from 'next'

import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useAuthContext } from '~/providers/AuthProvider'

const Home: NextPage = () => {
  const { user, signOut } = useAuthContext()
  console.log('user', user)
  return (
    <DefaultLayout>
      <h1>テンプレート</h1>
      <p>だんらく</p>
      <span>{user?.email}</span>
      <span>すぱん</span>
      <span>すぱーん</span>
      <button onClick={signOut}>ログアウト</button>
    </DefaultLayout>
  )
}

export default Home
