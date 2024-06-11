import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUserRepository } from '../../../repositories/prisma/prisma-users.repository'
import { CreateUserUseCase } from '../../../use-cases/users/create-user-use-case'
import { BadRequestError } from '../../_errors/bad-request-error'
import { CreateAccountRequestBodyType } from '../dtos/create-account'

export class CreateAccountController {
  async handle(
    req: FastifyRequest<{ Body: CreateAccountRequestBodyType }>,
    res: FastifyReply
  ) {
    const { username, email, password } = req.body

    const userRepository = new PrismaUserRepository()

    const service = new CreateUserUseCase(userRepository)

    const serviceReponse = await service.execute({
      email,
      password,
      username,
    })

    if (serviceReponse.error())
      throw new BadRequestError(serviceReponse.value.message)

    return res
      .status(201)
      .send({
        message: 'Usuário criado com sucesso',
        user: serviceReponse.value.user,
      })
  }
}
