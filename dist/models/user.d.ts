export declare enum Role {
    SUBSCRIBER = "SUBSCRIBER",
    PUBLISHER = "PUBLISHER",
    ADMIN = "ADMIN"
}
export interface UserPayload {
    id: number;
    email: string;
    role: Role;
}
