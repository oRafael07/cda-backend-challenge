import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaBadgeRepository } from '../../../repositories/prisma/prisma-badges.repository'
import { PrismaRedeemBadgeRepository } from '../../../repositories/prisma/prisma-redeem-badge.repository'
import { PrismaUserRepository } from '../../../repositories/prisma/prisma-users.repository'
import { RedeemBadgeUseCase } from '../../../use-cases/badges/redeem-badge-use-case'
import { BadRequestError } from '../../_errors/bad-request-error'
import { RedeemBadgesRequestParamsDTOType } from '../dtos/redeem-badges'

export class RedeemBadgeController {
  async handle(
    req: FastifyRequest<{ Params: RedeemBadgesRequestParamsDTOType }>,
    res: FastifyReply
  ) {
    const userId = await req.getUserId()

    const { badgeId } = req.params

    const userRepository = new PrismaUserRepository()
    const badgeRepository = new PrismaBadgeRepository()
    const redeemBadgeRepository = new PrismaRedeemBadgeRepository()

    const service = new RedeemBadgeUseCase(
      badgeRepository,
      userRepository,
      redeemBadgeRepository
    )

    const { error, value } = await service.execute({
      badgeId,
      userId,
    })

    if (error()) throw new BadRequestError(value.message)

    return res.status(201).send(value)
  }
}
