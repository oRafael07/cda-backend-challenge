import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { RedeemBadgeController } from '../controllers/badges/redeem-badge'
import {
  redeemBadgesRequestParamsDTO,
  redeemBadgesResponseDTO,
} from '../controllers/dtos/redeem-badges.d'
import { auth } from '../middlewares/auth'

const redeemBadgeController = new RedeemBadgeController()

export async function BadgesRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/badge/reedem/:badgeId',
      {
        schema: {
          tags: ['Badge'],
          summary: 'Redeem Badge',
          description: 'This endpoint is possible to redeem a badge',
          params: redeemBadgesRequestParamsDTO,
          response: {
            201: redeemBadgesResponseDTO,
          },
          security: [{ apiKey: [] }],
        },
      },
      redeemBadgeController.handle
    )
}
