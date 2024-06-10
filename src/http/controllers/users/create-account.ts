import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateAccountRequestBodyType } from '../dtos/create-account'

export class CreateAccountController {
  async handle(
    req: FastifyRequest<{ Body: CreateAccountRequestBodyType }>,
    _res: FastifyReply
  ) {
    const { username, email, password } = req.body
  }
}
