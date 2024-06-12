import { z } from 'zod'

export const profileAnotherUserRequestParamsDTO = z.object({
  userId: z.string().uuid(),
})

export type ProfileAnotherUserRequestParamsDTO = z.infer<
  typeof profileAnotherUserRequestParamsDTO
>
