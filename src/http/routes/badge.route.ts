import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { FetchBadgeController } from '../controllers/badges/fetch-badges'
import { RedeemBadgeController } from '../controllers/badges/redeem-badge'
import {
  fetchBadgeRequestQueryDTO,
  fetchBadgeResponseDTO,
} from '../controllers/dtos/fetch-badge.d'
import {
  redeemBadgesRequestParamsDTO,
  redeemBadgesResponseDTO,
} from '../controllers/dtos/redeem-badges.d'
import { UnauthorizedErrorResponse } from '../controllers/dtos/unauthorized.d'
import { auth } from '../middlewares/auth'

const redeemBadgeController = new RedeemBadgeController()
const fetchBadgeController = new FetchBadgeController()

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
            401: UnauthorizedErrorResponse,
          },
          security: [{ apiKey: [] }],
        },
      },
      redeemBadgeController.handle
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/badge',
      {
        schema: {
          tags: ['Badge'],
          summary: 'Fetch Badge',
          description: 'This endpoint is possible to fetch all badges',
          querystring: fetchBadgeRequestQueryDTO,
          response: {
            200: fetchBadgeResponseDTO,
            401: UnauthorizedErrorResponse,
          },
          security: [{ apiKey: [] }],
        },
      },
      fetchBadgeController.handle
    )
}
