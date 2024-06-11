import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  authenticateUserRequestBodyDTO,
  authenticateUserResponseBodyDTO,
} from '../controllers/dtos/authenticate-user.d'
import {
  createAccountRequestBodyDTO,
  createAccountResponseBodySuccessDTO,
} from '../controllers/dtos/create-account.d'
import { AuthenticateUserController } from '../controllers/users/authenticate-user'
import { CreateAccountController } from '../controllers/users/create-account'

const createAccountController = new CreateAccountController()
const authenticateUserController = new AuthenticateUserController()

export async function UsersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a new account',
        description: 'This endpoint is possible to create a new account',
        body: createAccountRequestBodyDTO,
        response: {
          201: createAccountResponseBodySuccessDTO,
        },
      },
    },
    createAccountController.handle
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/autheticate',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate a user',
        description: 'This endpoint is possible to authenticate a user',
        body: authenticateUserRequestBodyDTO,
        response: {
          200: authenticateUserResponseBodyDTO,
        },
      },
    },
    authenticateUserController.handle
  )
}
