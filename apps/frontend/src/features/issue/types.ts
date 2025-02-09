import { issueGenreSchema, issueStatusSchema } from '@voteboard/common'
import { z } from 'zod'

export const editIssueSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  description: z.string().min(1, { message: '説明を入力してください' }),
  genre: issueGenreSchema,
})

export type EditIssueInputType = z.infer<typeof editIssueSchema>

export const createIssueRequestSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  description: z.string().min(1, { message: '説明を入力してください' }),
  genre: issueGenreSchema,
  status: issueStatusSchema,
})

export const issueGenreOptions = [
  {
    label: '機能追加',
    value: 'FEATURE_REQUEST',
  },
  {
    label: '不具合修正',
    value: 'BUG_FIX',
  },
  {
    label: 'その他',
    value: 'OTHER',
  },
]

export const updateIssueStatusRequestSchema = z.object({
  id: z.string(),
  status: issueStatusSchema,
})

export type UpdateIssueStatusInputType = z.infer<
  typeof updateIssueStatusRequestSchema
>

export const createVoteRequestSchema = z.object({
  userId: z.string().optional(),
})

export type CreateVoteInputType = z.infer<typeof createVoteRequestSchema>
