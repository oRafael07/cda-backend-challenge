import { z } from 'zod'

export const createAccountRequestBodyDTO = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateAccountRequestBodyType = z.infer<
  typeof createAccountRequestBodyDTO
>
