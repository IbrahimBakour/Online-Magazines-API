import prisma from "../prisma.js";
import { PaymentStatus } from "../models/payment.js";

export async function createPayment(
  subscriptionId: number,
  amount: number,
  status: PaymentStatus = PaymentStatus.PAID
) {
  return prisma.payment.create({
    data: {
      subscriptionId,
      amount,
      date: new Date(),
      status,
    },
  });
}

export async function getPaymentsByDateRange(start: Date, end: Date) {
  return prisma.payment.findMany({
    where: {
      date: { gte: start, lte: end },
    },
  });
}

export async function getTotalPaymentsByDateRange(start: Date, end: Date) {
  const payments = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { date: { gte: start, lte: end }, status: PaymentStatus.PAID },
  });
  return payments._sum.amount || 0;
}
