import { useDisclosure } from '@mantine/hooks'
import { MdAddCircleOutline } from 'react-icons/md'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { useBoard } from '~/features/issue/hooks/useBoard'
import { EditIssueModal } from '~/features/issue/components/EditIssueModal'
import { KanbanBoard } from '~/features/issue/components/KanbanBoard'

type Props = {
  boardId: string
}

export const VoteBoardContainer = ({ boardId }: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const { board, isLoading, mutate, canEditBoard } = useBoard(boardId)
  return (
    <DefaultLayout>
      <TitleText>要望ボード</TitleText>
      <FlexBox justify="flex-start" align="flex-start" gap={16}>
        <BasicButton
          leftSection={<MdAddCircleOutline size={20} />}
          onClick={handlers.open}
        >
          チケットの作成
        </BasicButton>
        {board && mutate && (
          <KanbanBoard
            board={board}
            isLoading={isLoading}
            mutate={mutate}
            canEditBoard={canEditBoard}
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
    </DefaultLayout>
  )
}
