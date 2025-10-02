import type { Order } from "./order";
import type { Watch } from "./watch";

export interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  isVerified: boolean;
  role: "customer" | "admin";
  phone?: number;
  createdAt?: Date;
  orders?: Order[];
  favoriteWatches?: Watch[];
}
