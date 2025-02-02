import { z } from 'zod'

export const editBoardSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  description: z.string().min(1, { message: '説明を入力してください' }),
})

export type EditBoardInputType = z.infer<typeof editBoardSchema>
