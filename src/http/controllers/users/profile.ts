import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaBadgeRepository } from '../../../repositories/prisma/prisma-badges.repository'
import { PrismaUserRepository } from '../../../repositories/prisma/prisma-users.repository'
import { ProfileUserUseCase } from '../../../use-cases/users/profile-user-use-case'
import { BadRequestError } from '../../_errors/bad-request-error'

export class ProfileController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const userId = await req.getUserId()

    const userRepository = new PrismaUserRepository()
    const badgeRepository = new PrismaBadgeRepository()

    const service = new ProfileUserUseCase(userRepository, badgeRepository)

    const serviceResponse = await service.execute(userId)

    if (serviceResponse.error())
      throw new BadRequestError(serviceResponse.value.message)

    return res.status(200).send(serviceResponse.value.user)
  }
}
