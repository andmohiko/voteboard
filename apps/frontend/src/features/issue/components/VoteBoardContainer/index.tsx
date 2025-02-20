import { useDisclosure } from '@mantine/hooks'
import { MdAddCircleOutline } from 'react-icons/md'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { useBoard } from '~/features/issue/hooks/useBoard'
import { EditIssueModal } from '~/features/issue/components/EditIssueModal'
import { KanbanBoard } from '~/features/issue/components/KanbanBoard'
import { PleaseLoginModal } from '~/features/issue/components/PleaseLoginModal'
import { useAuthContext } from '~/providers/AuthProvider'

type Props = {
  boardId: string
}

export const VoteBoardContainer = ({ boardId }: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const [isOpenLoginModal, loginModalHandlers] = useDisclosure()
  const { user } = useAuthContext()
  const pleaseLogin = () => loginModalHandlers.open()
  const { board, isLoading, mutate, canEditBoard } = useBoard(boardId)
  return (
    <DefaultLayout>
      <TitleText>要望ボード</TitleText>
      <FlexBox justify="flex-start" align="flex-start" gap={16}>
        <BasicButton
          leftSection={<MdAddCircleOutline size={20} />}
          onClick={user ? handlers.open : pleaseLogin}
        >
          チケットの作成
        </BasicButton>
        {board && mutate && (
          <KanbanBoard
            board={board}
            isLoading={isLoading}
            mutate={mutate}
            canEditBoard={canEditBoard}
            pleaseLogin={pleaseLogin}
          />
        )}
      </FlexBox>

      {board && mutate && (
        <EditIssueModal
          isOpen={isOpen}
          onClose={handlers.close}
          board={board}
          mutate={mutate}
        />
      )}

      <PleaseLoginModal
        isOpen={isOpenLoginModal}
        onClose={loginModalHandlers.close}
      />
    </DefaultLayout>
  )
}
