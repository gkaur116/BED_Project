/**
 * Represents a review in the coffee shop
 */
export interface Review {
  id: string;
  userId: string;
  menuItemId: string;
  rating: number;
  comment: string;
}