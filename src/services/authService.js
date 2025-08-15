import { PrismaClient } from "@prisma/client";
import { Role } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export async function registerUser(name, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: { name, email, password: hashedPassword, role },
    });
}
export async function loginUser(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
        return null;
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return { token, user };
}
//# sourceMappingURL=authService.js.map