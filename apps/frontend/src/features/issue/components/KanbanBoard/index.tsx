import type {
  BoardWithIssuesWithVoteCount,
  IssueWithVoteCount,
} from '@voteboard/common'
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoChevronUpCircleOutline,
} from 'react-icons/io5'

import styles from './style.module.css'

import { FlexBox } from '~/components/Base/FlexBox'
import { TitleText } from '~/components/Typography/TitleText'
import { GridLayout } from '~/components/Base/GridLayout'
import { IconButton } from '~/components/Buttons/IconButton'

type Props = {
  board: BoardWithIssuesWithVoteCount
  isLoading: boolean
}

export const KanbanBoard = ({ board, isLoading }: Props): React.ReactNode => {
  const backlogIssues = board.issues.filter(
    (issue) => issue.status === 'BACKLOG',
  )
  const inProgressIssues = board.issues.filter(
    (issue) => issue.status === 'IN_PROGRESS',
  )
  const doneIssues = board.issues.filter((issue) => issue.status === 'DONE')
  const onVote = () => {
    console.log('vote')
  }
  const onMove = () => {
    console.log('move')
  }
  return (
    <GridLayout gridTemplateColumns="1fr 1fr 1fr" gap={16}>
      <KanbanColumn title="バックログ">
        {backlogIssues.map((issue) => (
          <KanbanCard
            key={issue.id}
            issue={issue}
            onVote={onVote}
            onMove={onMove}
          />
        ))}
      </KanbanColumn>
      <KanbanColumn title="進行中">
        {inProgressIssues.map((issue) => (
          <KanbanCard
            key={issue.id}
            issue={issue}
            onVote={onVote}
            onMove={onMove}
          />
        ))}
      </KanbanColumn>
      <KanbanColumn title="リリース済み">
        {doneIssues.map((issue) => (
          <KanbanCard
            key={issue.id}
            issue={issue}
            onVote={onVote}
            onMove={onMove}
          />
        ))}
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
  onMove?: (issue: IssueWithVoteCount) => void
}

export const KanbanCard = ({
  issue,
  onVote,
  onMove,
}: KanbanCardProps): React.ReactNode => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{issue.title}</p>
      <p className={styles.description}>{issue.description}</p>
      <FlexBox direction="row" justify="space-between" gap={8}>
        <IconButton
          icon={<IoChevronUpCircleOutline size={18} />}
          onClick={() => onVote && onVote(issue)}
        />
        <FlexBox direction="row" justify="flex-end" gap={8}>
          <IconButton
            icon={<IoChevronBackOutline size={18} />}
            onClick={() => onMove && onMove(issue)}
            importance="secondary"
          />
          <IconButton
            icon={<IoChevronForwardOutline size={18} />}
            onClick={() => onMove && onMove(issue)}
            importance="secondary"
          />
        </FlexBox>
      </FlexBox>
    </div>
  )
}
