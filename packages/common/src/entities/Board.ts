import type { IssueWithCommentsAndVotes, IssueWithVoteCount } from './Issue'

export type Board = {
  id: string
  title: string
  description: string
  companyId: string
  createdAt: Date
  updatedAt: Date
}

export type BoardWithIssuesWiteVoteCount = Board & {
  issues: Array<IssueWithVoteCount>
}

export type BoardWithIssuesWithCommentsAndVotes = Board & {
  issues: Array<IssueWithCommentsAndVotes>
}
