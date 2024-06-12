import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUserRepository } from '../../../repositories/prisma/prisma-users.repository'
import { FetchUserUseCase } from '../../../use-cases/users/fetch-user-use-case'
import { BadRequestError } from '../../_errors/bad-request-error'
import { FetchUsersRequestQueryDTOType } from '../dtos/fetch-users.d'

export class FetchUsersController {
  async handle(
    req: FastifyRequest<{ Querystring: FetchUsersRequestQueryDTOType }>,
    res: FastifyReply
  ) {
    await req.getUserId()
    const { query, page, limit } = req.query

    const userRepository = new PrismaUserRepository()

    const service = new FetchUserUseCase(userRepository)

    const serviceResponse = await service.execute({
      query,
      page,
      limit,
    })

    if (serviceResponse.error())
      throw new BadRequestError('Error fetching users')

    return res.status(200).send({
      pagination: serviceResponse.value.pagination,
      users: serviceResponse.value.users,
    })
  }
}
