import { z } from 'zod'

export const profileAnotherUserRequestParamsDTO = z.object({
  userId: z.string().uuid(),
})

export const profileAnotherUserResponseDTO = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  createdAt: z.date(),
  badges_redeemed: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      urlImage: z.string(),
      createdAt: z.date(),
      redeemedAt: z.date(),
    })
  ),
})

export type ProfileAnotherUserRequestParamsDTO = z.infer<
  typeof profileAnotherUserRequestParamsDTO
>
