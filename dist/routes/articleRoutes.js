import { createArticle, getArticlesByMagazine, getArticleById, } from "../services/articleService.js";
export default async function articleRoutes(fastify) {
    fastify.post("/", async (request, reply) => {
        const { title, content, magazineId, authorId } = request.body;
        const article = await createArticle(title, content, magazineId, authorId);
        reply.send(article);
    });
    fastify.get("/magazine/:magazineId", async (request, reply) => {
        const { magazineId } = request.params;
        // Check if magazine exists
        const magazine = await import("../services/magazineService.js").then((m) => m.getMagazineById(Number(magazineId)));
        if (!magazine) {
            return reply.status(404).send({ error: "Magazine not found" });
        }
        const articles = await getArticlesByMagazine(Number(magazineId));
        reply.send(articles);
    });
    fastify.get("/:id", async (request, reply) => {
        const { id } = request.params;
        const article = await getArticleById(Number(id));
        if (!article)
            return reply.status(404).send({ error: "Article not found" });
        reply.send(article);
    });
}
//# sourceMappingURL=articleRoutes.js.map