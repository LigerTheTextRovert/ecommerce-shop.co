import type { Watch } from "./watch";

export interface Order {
  id: number;
  customerId: number;
  items: Watch[];
  totalPrice: number;
  createdAt: Date;
  shippingAddress: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "credit_card" | "paypal" | "cod";
}
