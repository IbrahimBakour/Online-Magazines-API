import prisma from "../prisma.js";
import { logActivity } from "./activityLogService.js";

export async function createArticle(
  title: string,
  content: string,
  magazineId: number,
  authorId: number
) {
  const article = await prisma.article.create({
    data: { title, content, magazineId, authorId },
  });
  await logActivity({
    userId: authorId,
    action: "CREATE_ARTICLE",
    entityType: "Article",
    entityId: article.id,
  });
  return article;
}

export async function getArticlesByMagazine(magazineId: number) {
  return prisma.article.findMany({ where: { magazineId } });
}

export async function getArticleById(id: number) {
  return prisma.article.findUnique({ where: { id } });
}
