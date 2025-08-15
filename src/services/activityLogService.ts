import prisma from "../prisma.js";

export async function logActivity({
  userId,
  action,
  entityType,
  entityId,
}: {
  userId: number;
  action: string;
  entityType: string;
  entityId: number;
}) {
  return prisma.activityLog.create({
    data: { userId, action, entityType, entityId },
  });
}
