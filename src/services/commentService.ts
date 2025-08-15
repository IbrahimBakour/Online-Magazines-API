import prisma from "../prisma.js";
import { CommentStatus } from "../models/comment.js";
import { logActivity } from "./activityLogService.js";

export async function addComment(
  articleId: number,
  userId: number,
  content: string
) {
  const comment = await prisma.comment.create({
    data: { articleId, userId, content, status: CommentStatus.ACTIVE },
  });
  await logActivity({
    userId,
    action: "ADD_COMMENT",
    entityType: "Comment",
    entityId: comment.id,
  });
  return comment;
}

export async function getCommentsByArticle(articleId: number) {
  return prisma.comment.findMany({ where: { articleId } });
}

export async function blockComment(commentId: number, userId?: number) {
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { status: CommentStatus.BLOCKED },
  });
  if (userId) {
    await logActivity({
      userId,
      action: "BLOCK_COMMENT",
      entityType: "Comment",
      entityId: commentId,
    });
  }
  return comment;
}

export async function unblockComment(commentId: number, userId?: number) {
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { status: CommentStatus.ACTIVE },
  });
  if (userId) {
    await logActivity({
      userId,
      action: "UNBLOCK_COMMENT",
      entityType: "Comment",
      entityId: commentId,
    });
  }
  return comment;
}
