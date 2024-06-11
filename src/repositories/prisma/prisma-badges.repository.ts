import { Badge } from '@prisma/client'

import { db } from '../../lib/prisma'
import { BadgeRepository } from '../badges.repository'

export class PrismaBadgeRepository implements BadgeRepository {
  async getBadgesReedemedByUserId(userId: string): Promise<Badge[]> {
    const badges = await db.badge.findMany({
      where: {
        usersRedeemed: {
          some: {
            userId: userId,
          },
        },
      },
    })

    return badges
  }
}
