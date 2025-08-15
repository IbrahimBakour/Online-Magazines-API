import type { FastifyRequest, FastifyReply } from "fastify";
export declare function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function authorize(roles: string[]): (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map