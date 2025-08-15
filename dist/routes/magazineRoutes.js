import { createMagazine, getMagazines, getMagazineById, } from "../services/magazineService.js";
export default async function magazineRoutes(fastify) {
    fastify.post("/", async (request, reply) => {
        const { title, description, publisherId } = request.body;
        const magazine = await createMagazine(title, description, publisherId);
        reply.send(magazine);
    });
    fastify.get("/", async (request, reply) => {
        const magazines = await getMagazines();
        reply.send(magazines);
    });
    fastify.get("/:id", async (request, reply) => {
        const { id } = request.params;
        const magazine = await getMagazineById(Number(id));
        if (!magazine)
            return reply.status(404).send({ error: "Magazine not found" });
        reply.send(magazine);
    });
}
//# sourceMappingURL=magazineRoutes.js.map