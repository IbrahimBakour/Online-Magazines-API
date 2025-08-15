import { addComment, getCommentsByArticle, blockComment, unblockComment, } from "../services/commentService.js";
export default async function commentRoutes(fastify) {
    fastify.post("/", async (request, reply) => {
        const { articleId, userId, content } = request.body;
        const comment = await addComment(articleId, userId, content);
        reply.send(comment);
    });
    fastify.get("/article/:articleId", async (request, reply) => {
        const { articleId } = request.params;
        const comments = await getCommentsByArticle(Number(articleId));
        reply.send(comments);
    });
    fastify.patch("/:id/block", async (request, reply) => {
        const { id } = request.params;
        const comment = await blockComment(Number(id));
        reply.send(comment);
    });
    fastify.patch("/:id/unblock", async (request, reply) => {
        const { id } = request.params;
        const comment = await unblockComment(Number(id));
        reply.send(comment);
    });
}
//# sourceMappingURL=commentRoutes.js.map