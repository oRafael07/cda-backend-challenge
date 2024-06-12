import { Badge } from '@prisma/client'

import { db } from '../../lib/prisma'
import { BadgeRepository } from '../badges.repository'

export class PrismaBadgeRepository implements BadgeRepository {
  async findById(badgeId: string): Promise<Badge | null> {
    const badge = await db.badge.findUnique({
      where: { id: badgeId },
    })

    return badge
  }
}
