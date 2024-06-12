import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: env.APP_PORT,
  })
  .then((host) => {
    console.log(`Server listening on ${host}`)
    console.log(`API Documentation on ${host}/docs`)
  })
