import { createSubscription, getUserSubscriptions, getSubscriptionStatus, } from "../services/subscriptionService.js";
import prisma from "../prisma.js";
export default async function subscriptionRoutes(fastify) {
    fastify.post("/", async (request, reply) => {
        const { userId, magazineId, type } = request.body;
        // Check if user exists
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return reply.status(404).send({ error: "User not found" });
        }
        // Check if magazine exists
        const magazine = await prisma.magazine.findUnique({
            where: { id: magazineId },
        });
        if (!magazine) {
            return reply.status(404).send({ error: "Magazine not found" });
        }
        const subscription = await createSubscription(userId, magazineId, type);
        reply.send(subscription);
    });
    fastify.get("/user/:userId", async (request, reply) => {
        const { userId } = request.params;
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
        });
        if (!user) {
            return reply.status(404).send({ error: "User not found" });
        }
        const subscriptions = await getUserSubscriptions(Number(userId));
        reply.send(subscriptions);
    });
    fastify.get("/status", async (request, reply) => {
        const { userId, magazineId } = request.query;
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
        });
        if (!user) {
            return reply.status(404).send({ error: "User not found" });
        }
        // Check if magazine exists
        const magazine = await prisma.magazine.findUnique({
            where: { id: Number(magazineId) },
        });
        if (!magazine) {
            return reply.status(404).send({ error: "Magazine not found" });
        }
        const subscription = await getSubscriptionStatus(Number(userId), Number(magazineId));
        reply.send(subscription);
    });
}
//# sourceMappingURL=subscriptionRoutes.js.map