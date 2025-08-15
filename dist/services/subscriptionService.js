import prisma from "../prisma.js";
import { SubscriptionType, SubscriptionStatus, } from "../models/subscription.js";
export async function createSubscription(userId, magazineId, type) {
    const now = new Date();
    let endDate = new Date(now);
    if (type === SubscriptionType.MONTHLY) {
        endDate.setMonth(endDate.getMonth() + 1);
    }
    else {
        endDate.setFullYear(endDate.getFullYear() + 1);
    }
    return prisma.subscription.create({
        data: {
            userId,
            magazineId,
            type,
            status: SubscriptionStatus.ACTIVE,
            startDate: now,
            endDate,
        },
    });
}
export async function getUserSubscriptions(userId) {
    return prisma.subscription.findMany({ where: { userId } });
}
export async function getSubscriptionStatus(userId, magazineId) {
    return prisma.subscription.findFirst({ where: { userId, magazineId } });
}
//# sourceMappingURL=subscriptionService.js.map