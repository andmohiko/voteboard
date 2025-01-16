export type User = {
  id: string
  email: string
  name: string
  companyId: string | null
  isBanned: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
