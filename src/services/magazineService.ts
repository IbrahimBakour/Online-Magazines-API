import prisma from "../prisma.js";
import { logActivity } from "./activityLogService.js";

export async function createMagazine(
  title: string,
  description: string,
  publisherId: number
) {
  const magazine = await prisma.magazine.create({
    data: { title, description, publisherId },
  });
  await logActivity({
    userId: publisherId,
    action: "CREATE_MAGAZINE",
    entityType: "Magazine",
    entityId: magazine.id,
  });
  return magazine;
}

export async function getMagazines() {
  return prisma.magazine.findMany();
}

export async function getMagazineById(id: number) {
  return prisma.magazine.findUnique({ where: { id } });
}
