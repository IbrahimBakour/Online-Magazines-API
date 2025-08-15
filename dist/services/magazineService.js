import prisma from "../prisma.js";
export async function createMagazine(title, description, publisherId) {
    return prisma.magazine.create({
        data: { title, description, publisherId },
    });
}
export async function getMagazines() {
    return prisma.magazine.findMany();
}
export async function getMagazineById(id) {
    return prisma.magazine.findUnique({ where: { id } });
}
//# sourceMappingURL=magazineService.js.map