export type Vote = {
  id: string
  issueId: string
  createdAt: string
  updatedAt: string
  userId?: string | null
  externalAuthorId?: string | null
}
