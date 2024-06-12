import { z } from 'zod'

export const fetchBadgeRequestQueryDTO = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(5),
  name: z.string().optional(),
})

export const fetchBadgeResponseDTO = z.object({
  pagination: z.object({
    total: z.number(),
    pageCount: z.number(),
    currentPage: z.number(),
    perPage: z.number(),
    from: z.number(),
    to: z.number(),
  }),
  badges: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      urlImage: z.string(),
      createdAt: z.date(),
    })
  ),
})

export type FetchBadgeRequestQueryDTOType = z.infer<
  typeof fetchBadgeRequestQueryDTO
>
