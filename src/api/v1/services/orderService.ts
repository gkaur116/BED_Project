import * as firestoreRepository from "../repositories/firestoreRepository";
import { Order } from "../models/orderModel";
import { sendOrderConfirmationEmail } from "./emailService";

const COLLECTION = "orders";

/**
 * Retrieves all orders
 * @returns Array of all orders
 */
export const getAllOrders = async (): Promise<Order[]> => {
  const snapshot = await firestoreRepository.getDocuments(COLLECTION);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};

/**
 * Retrieves a single order by ID
 * @param id - The ID of the order to retrieve
 * @returns The order
 */
export const getOrderById = async (id: string): Promise<Order> => {
  const doc = await firestoreRepository.getDocumentById(COLLECTION, id);
  if (!doc) {
    throw new Error(`Order with ID ${id} not found`);
  }
  return { id: doc.id, ...doc.data() } as Order;
};

/**
 * Creates a new order and sends confirmation email
 * @param orderData - The data for the new order
 * @returns The created order
 */
export const createOrder = async (orderData: {
  userId: string;
  items: string[];
  totalPrice: number;
  customerEmail?: string;
}): Promise<Order> => {
  const orderWithStatus = {
    userId: orderData.userId,
    items: orderData.items,
    totalPrice: orderData.totalPrice,
    status: "pending",
  };
  const id = await firestoreRepository.createDocument<Order>(
    COLLECTION,
    orderWithStatus
  );
  // Send confirmation email if customer email is provided
  if (orderData.customerEmail) {
    await sendOrderConfirmationEmail(
      orderData.customerEmail,
      id,
      orderData.totalPrice,
      orderData.items
    );
  }
  return { id, ...orderWithStatus };
};

/**
 * Updates an existing order status
 * @param id - The ID of the order to update
 * @param orderData - The fields to update
 * @returns The updated order
 */
export const updateOrder = async (
  id: string,
  orderData: Pick<Order, "status">
): Promise<Order> => {
  await firestoreRepository.updateDocument<Order>(COLLECTION, id, orderData);
  const doc = await firestoreRepository.getDocumentById(COLLECTION, id);
  return { id, ...doc!.data() } as Order;
};

/**
 * Deletes an order
 * @param id - The ID of the order to delete
 */
export const deleteOrder = async (id: string): Promise<void> => {
  await firestoreRepository.deleteDocument(COLLECTION, id);
};