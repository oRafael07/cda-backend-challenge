import { Prisma, RedeemBadge } from '@prisma/client'

export interface RedeemBadgeRequestData {
  userId: string
  badgeId: string
}

export interface RedeemBadgeRepository {
  getBadgesReedemedByUserId(
    userId: string
  ): Promise<Prisma.RedeemBadgeGetPayload<{ include: { badge: true } }>[]>
  redeemBadge(data: RedeemBadgeRequestData): Promise<RedeemBadge>
  findRedeemBadge(data: RedeemBadgeRequestData): Promise<RedeemBadge | null>
}
