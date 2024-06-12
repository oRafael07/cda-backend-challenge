import z from 'zod'

export const UnauthorizedErrorResponse = z.object({
  message: z.string(),
})
