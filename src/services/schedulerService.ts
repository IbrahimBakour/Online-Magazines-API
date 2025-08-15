import cron from "node-cron";
import prisma from "../prisma.js";
import { SubscriptionStatus } from "../models/subscription.js";
import { sendNotification } from "./notificationService.js";

import { getTotalPaymentsByDateRange } from "./paymentService.js";

// Runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  const now = new Date();
  // Find subscriptions that have expired
  const expired = await prisma.subscription.findMany({
    where: {
      endDate: { lt: now },
      status: SubscriptionStatus.ACTIVE,
    },
  });
  for (const sub of expired) {
    await prisma.subscription.update({
      where: { id: sub.id },
      data: { status: SubscriptionStatus.EXPIRED },
    });
    // Notify user
    const user = await prisma.user.findUnique({ where: { id: sub.userId } });
    if (user && user.email) {
      await sendNotification({
        to: user.email,
        subject: "Subscription Expired",
        text: `Your subscription to magazine #${sub.magazineId} has expired.`,
      });
    }
  }
});

// Daily admin report at 8am
cron.schedule("0 8 * * *", async () => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  // Get stats
  const totalPayments = await getTotalPaymentsByDateRange(start, end);
  const newSubscriptions = await prisma.subscription.count({
    where: {
      startDate: { gte: start, lte: end },
    },
  });
  const expiredSubscriptions = await prisma.subscription.count({
    where: {
      endDate: { gte: start, lte: end },
      status: SubscriptionStatus.EXPIRED,
    },
  });

  // Find admin(s)
  const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
  for (const admin of admins) {
    if (admin.email) {
      await sendNotification({
        to: admin.email,
        subject: "Daily Subscriptions & Payments Report",
        text: `Daily Report for ${now.toDateString()}\n\nNew Subscriptions: ${newSubscriptions}\nExpired Subscriptions: ${expiredSubscriptions}\nTotal Payments: $${totalPayments}`,
      });
    }
  }
});
