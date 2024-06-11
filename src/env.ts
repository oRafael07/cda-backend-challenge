import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  APP_ENV: z.enum(['development', 'production']),
  APP_PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(1),

  PG_USER: z.string().min(1),
  PG_PASSWORD: z.string().min(1),
  PG_PORT: z.coerce.number().min(1),
  PG_DB: z.string().min(1),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.log('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
