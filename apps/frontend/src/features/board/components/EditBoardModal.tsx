import type { Board } from '@voteboard/common'

import { EditBoardForm } from '~/features/board/components/EditBoardForm'
import { BaseModal } from '~/components/Modals/BaseModal'

type Props = {
  isOpen: boolean
  onClose: () => void
  board?: Board
}

export const EditBoardModal = ({
  isOpen,
  onClose,
  board,
}: Props): React.ReactNode => {
  return (
    <BaseModal
      title={board ? 'ボードを編集' : 'ボードを作成'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <EditBoardForm onClose={onClose} />
    </BaseModal>
  )
}
