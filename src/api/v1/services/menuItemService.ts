import * as firestoreRepository from "../repositories/firestoreRepository";
import { MenuItem } from "../models/menuItemModel";

const COLLECTION = "menuItems";

/**
 * Retrieves all menu items
 * @returns Array of all menu items
 */
export const getAllMenuItems = async (): Promise<MenuItem[]> => {
  const snapshot = await firestoreRepository.getDocuments(COLLECTION);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as MenuItem[];
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
  const id = await firestoreRepository.createDocument<MenuItem>(
    COLLECTION,
    itemData
  );
  return { id, ...itemData };
};

/**
 * Updates an existing menu item
 * @param id - The ID of the menu item to update
 * @param itemData - The fields to update
 * @returns The updated menu item
 */
export const updateMenuItem = async (
  id: string,
  itemData: Pick<MenuItem, "name" | "price" | "category" | "availability">
): Promise<MenuItem> => {
  await firestoreRepository.updateDocument<MenuItem>(COLLECTION, id, itemData);
  return { id, ...itemData };
};

/**
 * Deletes a menu item
 * @param id - The ID of the menu item to delete
 */
export const deleteMenuItem = async (id: string): Promise<void> => {
  await firestoreRepository.deleteDocument(COLLECTION, id);
};