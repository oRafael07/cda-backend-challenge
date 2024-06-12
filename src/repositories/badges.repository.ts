import { Badge } from '@prisma/client'

export interface BadgeRepository {
  findById(badgeId: string): Promise<Badge | null>
}
