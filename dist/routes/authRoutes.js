import { registerUser, loginUser } from "../services/authService.js";
export default async function authRoutes(fastify) {
    fastify.post("/register", async (request, reply) => {
        const { name, email, password, role } = request.body;
        try {
            const user = await registerUser(name, email, password, role);
            reply.send({ user });
        }
        catch (err) {
            reply.status(400).send({ error: "Registration failed", details: err });
        }
    });
    fastify.post("/login", async (request, reply) => {
        const { email, password } = request.body;
        const result = await loginUser(email, password);
        if (!result)
            return reply.status(401).send({ error: "Invalid credentials" });
        reply.send(result);
    });
}
//# sourceMappingURL=authRoutes.js.map