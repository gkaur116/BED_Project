/**
 * Represents an order in the coffee shop
 */
export interface Order {
  id: string;
  userId: string;
  items: string[];
  totalPrice: number;
  status: string;
}