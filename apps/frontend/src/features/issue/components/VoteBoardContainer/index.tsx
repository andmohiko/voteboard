import { useDisclosure } from '@mantine/hooks'
import { MdAddCircleOutline } from 'react-icons/md'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { useBoard } from '~/features/issue/hooks/useBoard'
import { EditBoardModal } from '~/features/board/components/EditBoardModal'

type Props = {
  boardId: string
}

export const VoteBoardContainer = ({ boardId }: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const [board, isLoading] = useBoard(boardId)
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
      </FlexBox>

      <EditBoardModal isOpen={isOpen} onClose={handlers.close} />
    </DefaultLayout>
  )
}
