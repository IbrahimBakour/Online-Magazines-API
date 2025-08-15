import type { FastifyInstance } from "fastify";

import {
  addComment,
  getCommentsByArticle,
  blockComment,
  unblockComment,
} from "../services/commentService.js";
import prisma from "../prisma.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/permissions.js";
import { Role } from "../models/user.js";

export default async function commentRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRole([Role.SUBSCRIBER, Role.ADMIN])] },
    async (request, reply) => {
      const { articleId, userId, content } = request.body as {
        articleId: number;
        userId: number;
        content: string;
      };
      const user = (request as any).user;
      // Only allow user to comment as themselves unless admin
      if (user.role !== Role.ADMIN && user.id !== userId) {
        return reply
          .status(403)
          .send({ error: "Forbidden: cannot comment as another user" });
      }
      // Check if article exists
      const article = await prisma.article.findUnique({
        where: { id: articleId },
      });
      if (!article) {
        return reply.status(404).send({ error: "Article not found" });
      }
      // Check if user exists
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        return reply.status(404).send({ error: "User not found" });
      }
      const comment = await addComment(articleId, userId, content);
      reply.send(comment);
    }
  );

  fastify.get("/article/:articleId", async (request, reply) => {
    const { articleId } = request.params as { articleId: string };
    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id: Number(articleId) },
    });
    if (!article) {
      return reply.status(404).send({ error: "Article not found" });
    }
    const comments = await getCommentsByArticle(Number(articleId));
    reply.send(comments);
  });

  fastify.patch(
    "/:id/block",
    { preHandler: [authenticate, requireRole([Role.SUBSCRIBER, Role.ADMIN])] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      // Check if comment exists
      const commentExists = await prisma.comment.findUnique({
        where: { id: Number(id) },
      });
      if (!commentExists) {
        return reply.status(404).send({ error: "Comment not found" });
      }
      const comment = await blockComment(Number(id));
      reply.send(comment);
    }
  );

  fastify.patch(
    "/:id/unblock",
    { preHandler: [authenticate, requireRole([Role.ADMIN])] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const user = (request as any).user;
      // Check if comment exists
      const commentExists = await prisma.comment.findUnique({
        where: { id: Number(id) },
      });
      if (!commentExists) {
        return reply.status(404).send({ error: "Comment not found" });
      }
      // Only allow owner or admin to unblock
      if (user.role !== Role.ADMIN && commentExists.userId !== user.id) {
        return reply
          .status(403)
          .send({ error: "Forbidden: cannot unblock another user's comment" });
      }
      const comment = await unblockComment(Number(id));
      reply.send(comment);
    }
  );
}
