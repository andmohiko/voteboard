import type {
  BoardWithIssuesWithVoteCount,
  IssueStatus,
  IssueWithVoteCount,
} from '@voteboard/common'
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoRocketOutline,
} from 'react-icons/io5'
import { Loader } from '@mantine/core'
import type { KeyedMutator } from 'swr'

import styles from './style.module.css'

import { useVoteMutation } from '~/features/issue/hooks/useVoteMutation'
import { FlexBox } from '~/components/Base/FlexBox'
import { TitleText } from '~/components/Typography/TitleText'
import { GridLayout } from '~/components/Base/GridLayout'
import { IconButton } from '~/components/Buttons/IconButton'
import { BaseText } from '~/components/Typography/BaseText'
import { useToast } from '~/hooks/useToast'
import { useIssueStatusMutation } from '~/features/issue/hooks/useIssueStatusMutation'

type Props = {
  board: BoardWithIssuesWithVoteCount
  isLoading: boolean
  mutate: KeyedMutator<BoardWithIssuesWithVoteCount>
}

export const KanbanBoard = ({
  board,
  isLoading,
  mutate,
}: Props): React.ReactNode => {
  const { showErrorToast } = useToast()
  const { onAddVote } = useVoteMutation()
  const { onMoveIssue } = useIssueStatusMutation(board.id)
  const backlogIssues = board.issues.filter(
    (issue) => issue.status === 'BACKLOG',
  )
  const inProgressIssues = board.issues.filter(
    (issue) => issue.status === 'IN_PROGRESS',
  )
  const doneIssues = board.issues.filter((issue) => issue.status === 'DONE')
  const onVote = async (issue: IssueWithVoteCount) => {
    try {
      await onAddVote(issue)
      await mutate()
    } catch (error) {
      console.error(error)
      showErrorToast('投票に失敗しました')
    }
  }
  const onMove = async (issue: IssueWithVoteCount, status: IssueStatus) => {
    try {
      await onMoveIssue(issue, status)
      await mutate()
    } catch (error) {
      console.error(error)
      showErrorToast('チケットの移動に失敗しました')
    }
  }
  return (
    <GridLayout gridTemplateColumns="1fr 1fr 1fr" gap={16}>
      <KanbanColumn title="バックログ">
        {isLoading ? (
          <Loader color="#323232" type="dots" />
        ) : (
          backlogIssues.map((issue) => (
            <KanbanCard
              key={issue.id}
              issue={issue}
              onVote={onVote}
              onMoveForward={() => onMove(issue, 'IN_PROGRESS')}
            />
          ))
        )}
      </KanbanColumn>
      <KanbanColumn title="進行中">
        {isLoading ? (
          <Loader color="#323232" type="dots" />
        ) : (
          inProgressIssues.map((issue) => (
            <KanbanCard
              key={issue.id}
              issue={issue}
              onVote={onVote}
              onMoveForward={() => onMove(issue, 'DONE')}
              onMoveBackward={() => onMove(issue, 'BACKLOG')}
            />
          ))
        )}
      </KanbanColumn>
      <KanbanColumn title="リリース済み">
        {isLoading ? (
          <Loader color="#323232" type="dots" />
        ) : (
          doneIssues.map((issue) => (
            <KanbanCard
              key={issue.id}
              issue={issue}
              onVote={onVote}
              onMoveBackward={() => onMove(issue, 'IN_PROGRESS')}
            />
          ))
        )}
      </KanbanColumn>
    </GridLayout>
  )
}

type KanbanColumnProps = {
  title: string
  children: React.ReactNode
}

export const KanbanColumn = ({
  title,
  children,
}: KanbanColumnProps): React.ReactNode => {
  return (
    <div className={styles.column}>
      <TitleText level={3}>{title}</TitleText>
      <FlexBox justify="flex-start" gap={16}>
        {children}
      </FlexBox>
    </div>
  )
}

type KanbanCardProps = {
  issue: IssueWithVoteCount
  onVote?: (issue: IssueWithVoteCount) => void
  onMoveForward?: (issue: IssueWithVoteCount) => void
  onMoveBackward?: (issue: IssueWithVoteCount) => void
}

export const KanbanCard = ({
  issue,
  onVote,
  onMoveForward,
  onMoveBackward,
}: KanbanCardProps): React.ReactNode => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{issue.title}</p>
      <p className={styles.description}>{issue.description}</p>
      <FlexBox direction="row" justify="space-between" gap={8}>
        <FlexBox direction="row" justify="flex-start" gap={8}>
          <IconButton
            icon={<IoRocketOutline size={18} />}
            onClick={() => onVote && onVote(issue)}
            importance="secondary"
          />
          <BaseText>{`${issue.voteCount}票`}</BaseText>
        </FlexBox>
        <FlexBox direction="row" justify="flex-end" gap={8}>
          {onMoveBackward && (
            <IconButton
              icon={<IoChevronBackOutline size={18} />}
              onClick={() => onMoveBackward(issue)}
              importance="tertiary"
            />
          )}
          {onMoveForward ? (
            <IconButton
              icon={<IoChevronForwardOutline size={18} />}
              onClick={() => onMoveForward(issue)}
              importance="tertiary"
            />
          ) : (
            <div className={styles.emptyButton} />
          )}
        </FlexBox>
      </FlexBox>
    </div>
  )
}
