import { Prisma, RedeemBadge } from '@prisma/client'

import { db } from '../../lib/prisma'
import {
  RedeemBadgeRepository,
  RedeemBadgeRequestData,
} from '../redeem-badge.repository'

export class PrismaRedeemBadgeRepository implements RedeemBadgeRepository {
  async redeemBadge(data: RedeemBadgeRequestData): Promise<RedeemBadge> {
    const redeemBadge = await db.redeemBadge.create({
      data,
    })

    return redeemBadge
  }
  async findRedeemBadge(
    data: RedeemBadgeRequestData
  ): Promise<RedeemBadge | null> {
    const redeemBadge = await db.redeemBadge.findFirst({
      where: {
        badgeId: data.badgeId,
        userId: data.userId,
      },
    })

    return redeemBadge
  }

  async getBadgesReedemedByUserId(
    userId: string
  ): Promise<Prisma.RedeemBadgeGetPayload<{ include: { badge: true } }>[]> {
    const badges = db.redeemBadge.findMany({
      where: {
        userId: userId,
      },
      include: {
        badge: true,
      },
    })

    return badges
  }
}
