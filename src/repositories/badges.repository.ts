import { Badge } from '@prisma/client'

export interface BadgeRepository {
  getBadgesReedemedByUserId(userId: string): Promise<Badge[]>
}
