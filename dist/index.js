// Entry point for Fastify server
import fastify from "fastify";
import authRoutes from "./routes/authRoutes.js";
import magazineRoutes from "./routes/magazineRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
const app = fastify();
app.register(commentRoutes, { prefix: "/comments" });
app.register(subscriptionRoutes, { prefix: "/subscriptions" });
app.register(magazineRoutes, { prefix: "/magazines" });
app.register(articleRoutes, { prefix: "/articles" });
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