import { Role } from "../models/user.js";
export declare function registerUser(name: string, email: string, password: string, role: Role): Promise<{
    name: string;
    email: string;
    password: string;
    role: import("@prisma/client").$Enums.Role;
    id: number;
}>;
export declare function loginUser(email: string, password: string): Promise<{
    token: string;
    user: {
        name: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        id: number;
    };
} | null>;
