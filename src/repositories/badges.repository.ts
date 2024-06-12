import { Badge } from '@prisma/client'

export type PaginationReponse = {
  total: number
  pageCount: number
  currentPage: number
  perPage: number
  from: number
  to: number
}

export interface Pagination {
  page: number
  limit: number
}

export interface FetchBadge {
  name?: string
}

export interface BadgeRepository {
  fetch(
    query: FetchBadge,
    pagination?: Pagination
  ): Promise<{ badges: Badge[]; pagination?: PaginationReponse }>
  findById(badgeId: string): Promise<Badge | null>
}
