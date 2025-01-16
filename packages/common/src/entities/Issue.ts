import { z } from 'zod'

import type { Comment } from './Comment'
import type { Vote } from './Vote'

export const IssueStatusSchema = z.enum(['BACKLOG', 'IN_PROGRESS', 'DONE'])
export type IssueStatus = z.infer<typeof IssueStatusSchema>

export const IssueGenreSchema = z.enum(['FEATURE_REQUEST', 'BUG_FIX', 'OTHER'])
export type IssueGenre = z.infer<typeof IssueGenreSchema>

export type Issue = {
  id: string
  title: string
  description: string
  status: IssueStatus
  genre: IssueGenre
  createdAt: string
  updatedAt: string
  boardId: string
  authorId?: string
  externalAuthorId?: string
}

export type IssueWithVoteCount = Issue & {
  voteCount: number
}

export type IssueWithCommentsAndVotes = Issue & {
  comments: Array<Comment>
  votes: Array<Vote>
}
