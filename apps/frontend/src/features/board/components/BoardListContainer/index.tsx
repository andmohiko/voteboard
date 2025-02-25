import { useDisclosure } from '@mantine/hooks'
import { MdAddCircleOutline } from 'react-icons/md'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { BoardsTable } from '~/features/board/components/BoardsTable'
import { useBoards } from '~/features/board/hooks/useBoards'
import { EditBoardModal } from '~/features/board/components/EditBoardModal'

export const BoardListContainer = (): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const [boards, isLoading] = useBoards()
  return (
    <DefaultLayout>
      <TitleText>要望ボード</TitleText>
      <FlexBox justify="flex-start" align="flex-start" gap={16}>
        <BasicButton
          leftSection={<MdAddCircleOutline size={20} />}
          onClick={handlers.open}
        >
          ボードの作成
        </BasicButton>
        {boards.length === 0 ? (
          <p>ボードを作成しよう</p>
        ) : (
          <BoardsTable boards={boards} isLoading={isLoading} />
        )}
      </FlexBox>

      <EditBoardModal isOpen={isOpen} onClose={handlers.close} />
    </DefaultLayout>
  )
}
