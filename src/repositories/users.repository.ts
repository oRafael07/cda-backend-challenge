import { Prisma, User } from '@prisma/client'

type PaginationReponse = {
  total: number
  pageCount: number
  currentPage: number
  perPage: number
  from: number
  to: number
}

interface Pagination {
  page: number
  limit: number
}

interface FetchUser {
  query?: string
}

export interface UserRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  fetch(
    query: FetchUser,
    pagination?: Pagination
  ): Promise<{
    users: Prisma.UserGetPayload<{
      select: { id: true; username: true; email: true; createdAt: true }
    }>[]
    pagination?: PaginationReponse
  }>
}
