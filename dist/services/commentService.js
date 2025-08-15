import prisma from "../prisma.js";
import { CommentStatus } from "../models/comment.js";
export async function addComment(articleId, userId, content) {
    return prisma.comment.create({
        data: { articleId, userId, content, status: CommentStatus.ACTIVE },
    });
}
export async function getCommentsByArticle(articleId) {
    return prisma.comment.findMany({ where: { articleId } });
}
export async function blockComment(commentId) {
    return prisma.comment.update({
        where: { id: commentId },
        data: { status: CommentStatus.BLOCKED },
    });
}
export async function unblockComment(commentId) {
    return prisma.comment.update({
        where: { id: commentId },
        data: { status: CommentStatus.ACTIVE },
    });
}
//# sourceMappingURL=commentService.js.map