import { SubscriptionType } from "../models/subscription.js";
export declare function createSubscription(userId: number, magazineId: number, type: SubscriptionType): Promise<{
    id: number;
    magazineId: number;
    type: import("@prisma/client").$Enums.SubscriptionType;
    status: import("@prisma/client").$Enums.SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    userId: number;
}>;
export declare function getUserSubscriptions(userId: number): Promise<{
    id: number;
    magazineId: number;
    type: import("@prisma/client").$Enums.SubscriptionType;
    status: import("@prisma/client").$Enums.SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    userId: number;
}[]>;
export declare function getSubscriptionStatus(userId: number, magazineId: number): Promise<{
    id: number;
    magazineId: number;
    type: import("@prisma/client").$Enums.SubscriptionType;
    status: import("@prisma/client").$Enums.SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    userId: number;
} | null>;
