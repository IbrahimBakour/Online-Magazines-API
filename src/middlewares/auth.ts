import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers["authorization"];
    if (!authHeader) throw new Error("No token");
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No token provided");
    const payload = jwt.verify(token, JWT_SECRET) as unknown as UserPayload;
    (request as any).user = payload;
  } catch (err) {
    reply.status(401).send({ error: "Unauthorized" });
  }
}

export function authorize(roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as any).user as UserPayload;
    if (!user || !roles.includes(user.role)) {
      reply.status(403).send({ error: "Forbidden" });
    }
  };
}
