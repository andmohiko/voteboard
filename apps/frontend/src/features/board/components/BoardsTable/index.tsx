import type { Board } from '@voteboard/common'
import { useRouter } from 'next/router'

import { GridRow, GridTable } from '~/components/Base/GridTable'
import { BaseText } from '~/components/Typography/BaseText'

const columns = '1fr'
const header = ['ボード名']

type Props = {
  boards: Array<Board>
  isLoading: boolean
}

export const BoardsTable = ({ boards, isLoading }: Props): React.ReactNode => {
  const { push } = useRouter()
  const onClickDetail = async (id: string) => {
    await push(`/boards/${id}`)
  }

  return (
    <GridTable
      header={header}
      columns={columns}
      isLoading={isLoading}
      body={boards.map((board) => (
        <GridRow
          key={board.id}
          columns={columns}
          onClick={() => onClickDetail(board.id)}
        >
          <BaseText>{board.title}</BaseText>
        </GridRow>
      ))}
    />
  )
}
