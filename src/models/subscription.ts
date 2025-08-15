export enum SubscriptionType {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
}

export interface Subscription {
  id: number;
  userId: number;
  magazineId: number;
  type: SubscriptionType;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
}
