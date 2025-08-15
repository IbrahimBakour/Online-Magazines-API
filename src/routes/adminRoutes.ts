import type { FastifyInstance } from "fastify";
import prisma from "../prisma.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/permissions.js";
import { Role } from "../models/user.js";

export default async function adminRoutes(fastify: FastifyInstance) {
  // Delete user (admin only)
  fastify.delete(
    "/users/:id",
    { preHandler: [authenticate, requireRole([Role.ADMIN])] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) return reply.status(404).send({ error: "User not found" });
      await prisma.user.delete({ where: { id: Number(id) } });
      reply.send({ message: "User deleted" });
    }
  );

  // Activity logs (admin only)
  fastify.get(
    "/activity-logs",
    { preHandler: [authenticate, requireRole([Role.ADMIN])] },
    async (request, reply) => {
      const logs = await prisma.activityLog.findMany();
      reply.send(logs);
    }
  );

  // Payment reports (admin only)
  fastify.get(
    "/payment-reports",
    { preHandler: [authenticate, requireRole([Role.ADMIN])] },
    async (request, reply) => {
      const payments = await prisma.payment.findMany();
      reply.send(payments);
    }
  );
}
