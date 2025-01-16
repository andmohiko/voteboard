import type { IssueWithCommentsAndVotes, IssueWithVoteCount } from './Issue'

export type Board = {
  id: string
  title: string
  description: string
  isArchived: boolean
  companyId: string
  createdAt: string
  updatedAt: string
}

export type BoardWithIssuesWithVoteCount = Board & {
  issues: Array<IssueWithVoteCount>
}

export type BoardWithIssuesWithCommentsAndVotes = Board & {
  issues: Array<IssueWithCommentsAndVotes>
}
