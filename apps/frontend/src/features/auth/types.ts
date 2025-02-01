import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, { message: '8文字以上で入力してください' }),
    confirmPassword: z
      .string()
      .min(8, { message: '8文字以上で入力してください' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  })

export type SignUpInputType = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: '8文字以上で入力してください' }),
})

export type LoginInputType = z.infer<typeof loginSchema>
