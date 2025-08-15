export enum PaymentStatus {
  PAID = "PAID",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export interface Payment {
  id: number;
  subscriptionId: number;
  amount: number;
  date: string;
  status: PaymentStatus;
}
