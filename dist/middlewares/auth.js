import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export async function authenticate(request, reply) {
    try {
        const authHeader = request.headers["authorization"];
        if (!authHeader)
            throw new Error("No token");
        const token = authHeader.split(" ")[1];
        if (!token)
            throw new Error("No token provided");
        const payload = jwt.verify(token, JWT_SECRET);
        request.user = payload;
    }
    catch (err) {
        reply.status(401).send({ error: "Unauthorized" });
    }
}
export function authorize(roles) {
    return async (request, reply) => {
        const user = request.user;
        if (!user || !roles.includes(user.role)) {
            reply.status(403).send({ error: "Forbidden" });
        }
    };
}
//# sourceMappingURL=auth.js.map