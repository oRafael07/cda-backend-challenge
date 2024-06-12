import { Badge } from '@prisma/client'

import { Either, right } from '../../lib/either'
import {
  BadgeRepository,
  PaginationReponse,
} from '../../repositories/badges.repository'

interface FetchBadgeUseCaseRequest {
  page: number
  limit: number
  name?: string
}

type FetchBadgeUseCaseResponse = Either<
  null,
  {
    badges: Badge[]
    pagination?: PaginationReponse
  }
>

export class FetchBadgeUseCase {
  constructor(private readonly badgeRepository: BadgeRepository) {}

  async execute({
    name,
    page,
    limit,
  }: FetchBadgeUseCaseRequest): Promise<FetchBadgeUseCaseResponse> {
    const { badges, pagination } = await this.badgeRepository.fetch(
      {
        name,
      },
      {
        page,
        limit,
      }
    )

    return right({
      badges,
      pagination,
    })
  }
}
