import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ProfileAnotherUserController } from '../controllers/badges/profile-another-user'
import {
  authenticateUserRequestBodyDTO,
  authenticateUserResponseBodyDTO,
} from '../controllers/dtos/authenticate-user.d'
import {
  createAccountRequestBodyDTO,
  createAccountResponseBodySuccessDTO,
} from '../controllers/dtos/create-account.d'
import {
  FetchUsersRequestQueryDTO,
  fetchUsersResponseDTO,
} from '../controllers/dtos/fetch-users.d'
import {
  profileAnotherUserRequestParamsDTO,
  profileAnotherUserResponseDTO,
} from '../controllers/dtos/profile-another-user.d'
import { UnauthorizedErrorResponse } from '../controllers/dtos/unauthorized.d'
import { AuthenticateUserController } from '../controllers/users/authenticate-user'
import { CreateAccountController } from '../controllers/users/create-account'
import { FetchUsersController } from '../controllers/users/fetch-users'
import { ProfileController } from '../controllers/users/profile'
import { auth } from '../middlewares/auth'

const getProfileAnotherUserController = new ProfileAnotherUserController()

const createAccountController = new CreateAccountController()
const authenticateUserController = new AuthenticateUserController()
const profileUserController = new ProfileController()
const fetchUserController = new FetchUsersController()

export async function UsersRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/users',
      {
        schema: {
          tags: ['User'],
          summary: 'Fetch users',
          description: 'This endpoint is possible to fetch all users',
          querystring: FetchUsersRequestQueryDTO,
          security: [{ apiKey: [] }],
          response: {
            200: fetchUsersResponseDTO,
          },
        },
      },
      fetchUserController.handle
    )

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
    '/authenticate',
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

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/users/profile',
      {
        schema: {
          tags: ['User'],
          summary: 'Get user profile authenticated',
          security: [{ apiKey: [] }],
          response: {
            401: UnauthorizedErrorResponse,
            200: profileAnotherUserResponseDTO,
          },
        },
      },
      profileUserController.handle
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/users/profile/:userId',
      {
        schema: {
          tags: ['User'],
          summary: 'Get Profile another user',
          description: 'This endpoint is possible to get profile another user',
          params: profileAnotherUserRequestParamsDTO,
          response: {
            401: UnauthorizedErrorResponse,
            200: profileAnotherUserResponseDTO,
          },
          security: [{ apiKey: [] }],
        },
      },
      getProfileAnotherUserController.handle
    )
}
