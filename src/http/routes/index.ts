import { FastifyInstance } from "fastify";

import { BadgesRoutes } from "./badge.route";
import { UsersRoutes } from "./users.route";

export async function RouterRoot(app: FastifyInstance) {
  app.register(UsersRoutes);
  app.register(BadgesRoutes);
}
