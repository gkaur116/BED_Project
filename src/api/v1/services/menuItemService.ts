import { HTTP_STATUS } from "../../../constants/httpConstants";

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

// In-memory storage for demo purposes
const menuItems: MenuItem[] = [];

/**
 * Retrieves all menu items
 * @returns Array of all menu items
 */
export const getAllMenuItems = async (): Promise<MenuItem[]> => {
  return structuredClone(menuItems);
};

/**
 * Creates a new menu item
 * @param itemData - The data for the new menu item
 * @returns The created menu item
 */
export const createMenuItem = async (itemData: {
  name: string;
  price: number;
  category: string;
  availability: boolean;
}): Promise<MenuItem> => {
  const newItem: MenuItem = {
    id: Date.now().toString(),
    name: itemData.name,
    price: itemData.price,
    category: itemData.category,
    availability: itemData.availability,
  };
  menuItems.push(newItem);
  return newItem;
};

/**
 * Updates an existing menu item
 * @param id - The ID of the menu item to update
 * @param itemData - The fields to update
 * @returns The updated menu item
 * @throws Error if menu item is not found
 */
export const updateMenuItem = async (
  id: string,
  itemData: Pick<MenuItem, "name" | "price" | "category" | "availability">
): Promise<MenuItem> => {
  const index: number = menuItems.findIndex(
    (item: MenuItem) => item.id === id
  );
  if (index === -1) {
    throw new Error(`Menu item with ID ${id} not found`);
  }
  menuItems[index] = {
    ...menuItems[index],
    ...itemData,
  };
  return structuredClone(menuItems[index]);
};

/**
 * Deletes a menu item
 * @param id - The ID of the menu item to delete
 * @throws Error if menu item is not found
 */
export const deleteMenuItem = async (id: string): Promise<void> => {
  const index: number = menuItems.findIndex(
    (item: MenuItem) => item.id === id
  );
  if (index === -1) {
    throw new Error(`Menu item with ID ${id} not found`);
  }
  menuItems.splice(index, 1);
};