import { z } from 'zod'

export const authenticateUserRequestBodyDTO = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const authenticateUserResponseBodyDTO = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
  }),
  token: z.string(),
})

export type AuthenticateUserRequestBodyType = z.infer<
  typeof authenticateUserRequestBodyDTO
>
