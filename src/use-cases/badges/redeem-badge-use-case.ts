import { Badge } from '@prisma/client'

import { Either, left, right } from '../../lib/either'
import { BadgeRepository } from '../../repositories/badges.repository'
import { RedeemBadgeRepository } from '../../repositories/redeem-badge.repository'
import { UserRepository } from '../../repositories/users.repository'

interface RedeemBadgeUseCaseRequest {
  badgeId: string
  userId: string
}

type RedeemBadgeUseCaseResponse = Either<
  { message: string },
  {
    message: string
    badge: Badge
  }
>

export class RedeemBadgeUseCase {
  constructor(
    private readonly badgeRepository: BadgeRepository,
    private readonly userRepository: UserRepository,
    private readonly redeemBadgeRepository: RedeemBadgeRepository
  ) {}

  async execute(
    data: RedeemBadgeUseCaseRequest
  ): Promise<RedeemBadgeUseCaseResponse> {
    const badge = await this.badgeRepository.findById(data.badgeId)

    if (!badge)
      return left({
        message: 'Emblema não encontrado.',
      })

    const user = await this.userRepository.findById(data.userId)

    if (!user)
      return left({
        message: 'Usuário não encontrado.',
      })

    const userAlreadyRedeemBadge =
      await this.redeemBadgeRepository.findRedeemBadge({
        badgeId: data.badgeId,
        userId: data.userId,
      })

    if (userAlreadyRedeemBadge)
      return left({
        message: 'Você já resgatou este emblema.',
      })

    const redeemedBadge = await this.redeemBadgeRepository.redeemBadge({
      badgeId: data.badgeId,
      userId: data.userId,
    })

    return right({
      message: 'Emblema resgatado com sucesso.',
      redeemedAt: redeemedBadge.redeemedAt,
      badge,
    })
  }
}
