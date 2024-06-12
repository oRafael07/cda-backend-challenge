import { z } from 'zod'

export const FetchUsersRequestQueryDTO = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(5),
  query: z.string().optional(),
})

export const fetchUsersResponseDTO = z.object({
  pagination: z.object({
    total: z.number(),
    pageCount: z.number(),
    currentPage: z.number(),
    perPage: z.number(),
    from: z.number(),
    to: z.number(),
  }),
  users: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
      createdAt: z.date(),
    })
  ),
})

export type FetchUsersRequestQueryDTOType = z.infer<
  typeof FetchUsersRequestQueryDTO
>
