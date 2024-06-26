import { Badge } from '@prisma/client'

import { Either, left, right } from '../../lib/either'
import { RedeemBadgeRepository } from '../../repositories/redeem-badge.repository'
import { UserRepository } from '../../repositories/users.repository'

type ProfileUserUserCase = Either<
  {
    message: string
  },
  {
    user: {
      id: string
      username: string
      email: string
      createdAt: Date
      badges_redeemed: Badge[]
    }
  }
>

export class ProfileUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redeemBadgeRepository: RedeemBadgeRepository
  ) {}
  async execute(userId: string): Promise<ProfileUserUserCase> {
    const user = await this.userRepository.findById(userId)

    if (!user)
      return left({
        message: 'Usuário não encontrado.',
      })

    const badges =
      await this.redeemBadgeRepository.getBadgesReedemedByUserId(userId)

    return right({
      user: {
        ...user,
        password: undefined,
        badges_redeemed: badges.map((item) => {
          return {
            ...item.badge,
            redeemedAt: item.redeemedAt,
          }
        }),
      },
    })
  }
}
