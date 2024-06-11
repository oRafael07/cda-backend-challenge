import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (req) => {
    req.getUserId = async () => {
      try {
        const { sub } = await req.jwtVerify<{ sub: string }>()

        return sub
      } catch (err) {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
})
