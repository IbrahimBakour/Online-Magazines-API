import type { FastifyRequest, FastifyReply } from "fastify";
import { Role } from "../models/user.js";

export function requireRole(roles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as any).user;
    if (!user || !roles.includes(user.role)) {
      return reply
        .status(403)
        .send({ error: "Forbidden: insufficient permissions" });
    }
  };
}
