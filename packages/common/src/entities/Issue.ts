import { z } from 'zod'

import type { Comment } from './Comment'
import type { Vote } from './Vote'

export const issueStatusSchema = z.enum(['BACKLOG', 'IN_PROGRESS', 'DONE'])
export type IssueStatus = z.infer<typeof issueStatusSchema>
export const issueStatusLabels: Record<IssueStatus, string> = {
  BACKLOG: 'バックログ',
  IN_PROGRESS: '着手中',
  DONE: 'リリース済み',
}

export const issueGenreSchema = z.enum(['FEATURE_REQUEST', 'BUG_FIX', 'OTHER'])
export type IssueGenre = z.infer<typeof issueGenreSchema>
export const issueGenreLabels: Record<IssueGenre, string> = {
  FEATURE_REQUEST: '機能追加',
  BUG_FIX: '不具合修正',
  OTHER: 'その他',
}

export type Issue = {
  id: string
  title: string
  description: string
  status: IssueStatus
  genre: IssueGenre
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  boardId: string
  authorId: string | null
  externalAuthorId: string | null
}

export type IssueWithVoteCount = Issue & {
  voteCount: number
}

export type IssueWithCommentsAndVotes = Issue & {
  comments: Array<Comment>
  votes: Array<Vote>
}
