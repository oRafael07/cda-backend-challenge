import { Badge } from '@prisma/client'

import { db } from '../../lib/prisma'
import {
  BadgeRepository,
  FetchBadge,
  Pagination,
  PaginationReponse,
} from '../badges.repository'

export class PrismaBadgeRepository implements BadgeRepository {
  async findById(badgeId: string): Promise<Badge | null> {
    const badge = await db.badge.findUnique({
      where: { id: badgeId },
    })

    return badge
  }

  async fetch(
    query: FetchBadge,
    pagination?: Pagination | undefined
  ): Promise<{
    badges: Badge[]
    pagination?: PaginationReponse
  }> {
    const [badges, badgesCount] = await db.$transaction([
      db.badge.findMany({
        where: query
          ? {
              name: {
                contains: query.name,
                mode: 'insensitive',
              },
            }
          : undefined,
        skip: pagination && pagination.limit * (pagination.page - 1),
        take: pagination && pagination.limit,
      }),
      db.badge.count({
        where: query
          ? {
              name: {
                contains: query.name,
                mode: 'insensitive',
              },
            }
          : undefined,
        skip: pagination && pagination.limit * (pagination.page - 1),
        take: pagination && pagination.limit,
      }),
    ])

    const paginationBody = pagination && {
      total: badgesCount,
      pageCount: Math.ceil(badgesCount / pagination.limit),
      currentPage: pagination.page,
      perPage: pagination.limit,
      from: Math.min((pagination.page - 1) * pagination.limit + 1, badgesCount),
      to: (pagination.page - 1) * pagination.limit + badges.length,
    }

    return {
      badges,
      pagination: paginationBody,
    }
  }
}
