import { z } from 'zod'

export const createAccountRequestBodyDTO = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const createAccountResponseBodySuccessDTO = z.object({
  message: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    createdAt: z.date(),
  }),
})

export type CreateAccountRequestBodyType = z.infer<
  typeof createAccountRequestBodyDTO
>
