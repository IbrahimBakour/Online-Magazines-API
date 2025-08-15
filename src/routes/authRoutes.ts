import type { FastifyInstance } from "fastify";
import { registerUser, loginUser } from "../services/authService.js";
import { Role } from "../models/user.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", async (request, reply) => {
    const { name, email, password, role } = request.body as {
      name: string;
      email: string;
      password: string;
      role: Role;
    };
    try {
      const user = await registerUser(name, email, password, role);
      reply.send({ user });
    } catch (err) {
      reply.status(400).send({ error: "Registration failed", details: err });
    }
  });

  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const result = await loginUser(email, password);
    if (!result)
      return reply.status(401).send({ error: "Invalid credentials" });
    reply.send(result);
  });
}
