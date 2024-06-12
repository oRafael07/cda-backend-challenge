import z from 'zod'

export const redeemBadgesRequestParamsDTO = z.object({
  badgeId: z.string().uuid(),
})

export const redeemBadgesResponseDTO = z.object({
  message: z.string(),
  redeemed_at: z.date(),
  badge: z.object({
    id: z.string(),
    name: z.string(),
    urlImage: z.string(),
    createdAt: z.date(),
  }),
})

export type RedeemBadgesRequestParamsDTOType = z.infer<
  typeof redeemBadgesRequestParamsDTO
>
