import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaBadgeRepository } from '../../../repositories/prisma/prisma-badges.repository'
import { FetchBadgeUseCase } from '../../../use-cases/badges/fetch-badge-use-case'
import { BadRequestError } from '../../_errors/bad-request-error'
import { FetchBadgeRequestQueryDTOType } from '../dtos/fetch-badge.d'

export class FetchBadgeController {
  async handle(
    req: FastifyRequest<{ Querystring: FetchBadgeRequestQueryDTOType }>,
    res: FastifyReply
  ) {
    await req.getUserId()
    const { page, limit, name } = req.query

    const badgeRepository = new PrismaBadgeRepository()

    const service = new FetchBadgeUseCase(badgeRepository)

    const { error, value } = await service.execute({
      limit,
      page,
      name,
    })

    if (error()) throw new BadRequestError('Error fetching badge')

    return res.status(200).send({
      pagination: value?.pagination,
      badges: value?.badges,
    })
  }
}
