import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function createArticle(title, content, magazineId, authorId) {
    return prisma.article.create({
        data: { title, content, magazineId, authorId },
    });
}
export async function getArticlesByMagazine(magazineId) {
    return prisma.article.findMany({ where: { magazineId } });
}
export async function getArticleById(id) {
    return prisma.article.findUnique({ where: { id } });
}
//# sourceMappingURL=articleService.js.map