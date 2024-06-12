import { Prisma } from '@prisma/client'

import { Either, right } from '../../lib/either'
import { PaginationReponse } from '../../repositories/badges.repository'
import { UserRepository } from '../../repositories/users.repository'

interface FetchUserUseCaseRequest {
  page: number
  limit: number
  query?: string
}

type FetchUserUseCaseResponse = Either<
  null,
  {
    users: Prisma.UserGetPayload<{
      select: { id: true; username: true; email: true; createdAt: true }
    }>[]
    pagination?: PaginationReponse
  }
>

export class FetchUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({
    query,
    limit,
    page,
  }: FetchUserUseCaseRequest): Promise<FetchUserUseCaseResponse> {
    const { users, pagination } = await this.userRepository.fetch(
      {
        query,
      },
      {
        limit,
        page,
      }
    )

    return right({
      users,
      pagination,
    })
  }
}
