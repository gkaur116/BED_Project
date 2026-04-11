/**
 * Represents a menu item in the coffee shop
 */
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  availability: boolean;
}