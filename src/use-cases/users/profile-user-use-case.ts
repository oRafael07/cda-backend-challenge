import { Badge } from '@prisma/client'

import { Either, left, right } from '../../lib/either'
import { BadgeRepository } from '../../repositories/badges.repository'
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
    private readonly badgeRepository: BadgeRepository
  ) {}
  async execute(userId: string): Promise<ProfileUserUserCase> {
    const user = await this.userRepository.findById(userId)

    if (!user)
      return left({
        message: 'Usuário não encontrado.',
      })

    const badges = await this.badgeRepository.getBadgesReedemedByUserId(userId)

    return right({
      user: {
        ...user,
        password: undefined,
        badges_redeemed: badges,
      },
    })
  }
}
