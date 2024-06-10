import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createAccountRequestBodyDTO } from "../controllers/dtos/create-account";
import { CreateAccountController } from "../controllers/users/create-account";

const createAccountController = new CreateAccountController();

export async function UsersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        body: createAccountRequestBodyDTO,
      },
    },
    createAccountController.handle,
  );
}
