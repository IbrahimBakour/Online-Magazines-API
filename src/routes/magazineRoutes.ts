import type { FastifyInstance } from "fastify";
import {
  createMagazine,
  getMagazines,
  getMagazineById,
} from "../services/magazineService.js";

import { authenticate } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/permissions.js";
import { Role } from "../models/user.js";

export default async function magazineRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRole([Role.PUBLISHER, Role.ADMIN])] },
    async (request, reply) => {
      const { title, description, publisherId } = request.body as {
        title: string;
        description: string;
        publisherId: number;
      };
      const user = (request as any).user;
      // Only allow publisher to create for themselves unless admin
      if (user.role === Role.PUBLISHER && user.id !== publisherId) {
        return reply
          .status(403)
          .send({
            error: "Forbidden: cannot create magazine for another publisher",
          });
      }
      const magazine = await createMagazine(title, description, publisherId);
      reply.send(magazine);
    }
  );

  fastify.get("/", async (request, reply) => {
    const magazines = await getMagazines();
    reply.send(magazines);
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const magazine = await getMagazineById(Number(id));
    if (!magazine)
      return reply.status(404).send({ error: "Magazine not found" });
    reply.send(magazine);
  });
}
