export async function renewSubscription(
  subscriptionId: number,
  userId: number
) {
  const now = new Date();
  const subscription = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      status: SubscriptionStatus.ACTIVE,
      endDate: now,
    },
  });
  await logActivity({
    userId,
    action: "RENEW_SUBSCRIPTION",
    entityType: "Subscription",
    entityId: subscriptionId,
  });
  return subscription;
}
import prisma from "../prisma.js";
import {
  SubscriptionType,
  SubscriptionStatus,
} from "../models/subscription.js";

import { logActivity } from "./activityLogService.js";
import { sendNotification } from "./notificationService.js";
import { createPayment } from "./paymentService.js";

export async function createSubscription(
  userId: number,
  magazineId: number,
  type: SubscriptionType
) {
  const now = new Date();
  let endDate = new Date(now);
  if (type === SubscriptionType.MONTHLY) {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }
  const subscription = await prisma.subscription.create({
    data: {
      userId,
      magazineId,
      type,
      status: SubscriptionStatus.ACTIVE,
      startDate: now,
      endDate,
    },
  });
  await logActivity({
    userId,
    action: "CREATE_SUBSCRIPTION",
    entityType: "Subscription",
    entityId: subscription.id,
  });
  // Record payment (basic fixed amount, e.g., $10)
  await createPayment(subscription.id, 10);
  // Send notification to user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user && user.email) {
    await sendNotification({
      to: user.email,
      subject: "Subscription Created",
      text: `Your subscription to magazine #${magazineId} has been created and is now active.`,
    });
  }
  return subscription;
}

export async function getUserSubscriptions(userId: number) {
  return prisma.subscription.findMany({ where: { userId } });
}

export async function getSubscriptionStatus(
  userId: number,
  magazineId: number
) {
  return prisma.subscription.findFirst({ where: { userId, magazineId } });
}
