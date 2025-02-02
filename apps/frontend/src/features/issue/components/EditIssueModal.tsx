import type { BoardWithIssuesWithVoteCount, Issue } from '@voteboard/common'

import { BaseModal } from '~/components/Modals/BaseModal'
import { EditIssueForm } from '~/features/issue/components/EditIssueForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  board: BoardWithIssuesWithVoteCount
  issue?: Issue
}

export const EditIssueModal = ({
  isOpen,
  onClose,
  board,
  issue,
}: Props): React.ReactNode => {
  return (
    <BaseModal
      title={issue ? 'チケットを編集' : 'チケットを作成'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <EditIssueForm onClose={onClose} board={board} />
    </BaseModal>
  )
}
