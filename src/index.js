// Entry point for Fastify server
import fastify from "fastify";
import authRoutes from "./routes/authRoutes.js";
const app = fastify();
app.register(authRoutes, { prefix: "/auth" });
app.get("/", async (request, reply) => {
    return { status: "OK", message: "Digital Magazines API" };
});
app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=index.js.map