import type { FastifyInstance } from "fastify";
import {
  createArticle,
  getArticlesByMagazine,
  getArticleById,
} from "../services/articleService.js";
import prisma from "../prisma.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/permissions.js";
import { Role } from "../models/user.js";

export default async function articleRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRole([Role.PUBLISHER, Role.ADMIN])] },
    async (request, reply) => {
      const { title, content, magazineId, authorId } = request.body as {
        title: string;
        content: string;
        magazineId: number;
        authorId: number;
      };
      const user = (request as any).user;
      // Only allow publisher to create for themselves unless admin
      if (user.role === Role.PUBLISHER && user.id !== authorId) {
        return reply
          .status(403)
          .send({
            error: "Forbidden: cannot create article for another publisher",
          });
      }
      // Only allow publisher to add articles to their own magazines unless admin
      if (user.role === Role.PUBLISHER) {
        const magazine = await prisma.magazine.findUnique({
          where: { id: magazineId },
        });
        if (!magazine || magazine.publisherId !== user.id) {
          return reply
            .status(403)
            .send({
              error:
                "Forbidden: cannot add article to a magazine you do not own",
            });
        }
      }
      const article = await createArticle(title, content, magazineId, authorId);
      reply.send(article);
    }
  );

  fastify.get("/magazine/:magazineId", async (request, reply) => {
    const { magazineId } = request.params as { magazineId: string };
    // Check if magazine exists
    const magazine = await import("../services/magazineService.js").then((m) =>
      m.getMagazineById(Number(magazineId))
    );
    if (!magazine) {
      return reply.status(404).send({ error: "Magazine not found" });
    }
    const articles = await getArticlesByMagazine(Number(magazineId));
    reply.send(articles);
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const article = await getArticleById(Number(id));
    if (!article) return reply.status(404).send({ error: "Article not found" });
    reply.send(article);
  });
}
