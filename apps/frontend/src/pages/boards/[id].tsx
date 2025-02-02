import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { VoteBoardContainer } from '~/features/issue/components/VoteBoardContainer'

const VoteBoardPage: NextPage = () => {
  const { query } = useRouter()
  const boardId = query.id as string
  return <VoteBoardContainer boardId={boardId} />
}

export default VoteBoardPage
