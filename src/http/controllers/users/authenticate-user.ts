import type { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUserRepository } from '../../../repositories/prisma/prisma-users.repository'
import { AuthenticateUserUseCase } from '../../../use-cases/users/authenticate-user-use-case'
import { BadRequestError } from '../../_errors/bad-request-error'
import { AuthenticateUserRequestBodyType } from '../dtos/authenticate-user.d'

export class AuthenticateUserController {
  async handle(
    req: FastifyRequest<{ Body: AuthenticateUserRequestBodyType }>,
    res: FastifyReply
  ) {
    const { email, password } = req.body

    const userRepository = new PrismaUserRepository()

    const service = new AuthenticateUserUseCase(userRepository)

    const serviceResponse = await service.execute({
      email,
      password,
    })

    if (serviceResponse.error())
      throw new BadRequestError(serviceResponse.value.message)

    const token = await res.jwtSign(
      { sub: serviceResponse.value.user.id },
      {
        sign: {
          expiresIn: '7d',
        },
      }
    )

    return res.status(200).send({
      user: serviceResponse.value.user,
      token,
    })
  }
}
