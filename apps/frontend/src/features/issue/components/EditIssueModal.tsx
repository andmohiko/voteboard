import type { BoardWithIssuesWithVoteCount, Issue } from '@voteboard/common'
import type { KeyedMutator } from 'swr'

import { BaseModal } from '~/components/Modals/BaseModal'
import { EditIssueForm } from '~/features/issue/components/EditIssueForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  board: BoardWithIssuesWithVoteCount
  issue?: Issue
  mutate: KeyedMutator<BoardWithIssuesWithVoteCount>
}

export const EditIssueModal = ({
  isOpen,
  onClose,
  board,
  issue,
  mutate,
}: Props): React.ReactNode => {
  return (
    <BaseModal
      title={issue ? 'チケットを編集' : 'チケットを作成'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <EditIssueForm onClose={onClose} board={board} mutate={mutate} />
    </BaseModal>
  )
}
