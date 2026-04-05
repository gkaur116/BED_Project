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

// In-memory storage for demo purposes
const orders: Order[] = [];

/**
 * Retrieves all orders
 * @returns Array of all orders
 */
export const getAllOrders = async (): Promise<Order[]> => {
  return structuredClone(orders);
};

/**
 * Retrieves a single order by ID
 * @param id - The ID of the order to retrieve
 * @returns The order
 * @throws Error if order is not found
 */
export const getOrderById = async (id: string): Promise<Order> => {
  const order: Order | undefined = orders.find(
    (order: Order) => order.id === id
  );
  if (!order) {
    throw new Error(`Order with ID ${id} not found`);
  }
  return structuredClone(order);
};

/**
 * Creates a new order
 * @param orderData - The data for the new order
 * @returns The created order
 */
export const createOrder = async (orderData: {
  userId: string;
  items: string[];
  totalPrice: number;
}): Promise<Order> => {
  const newOrder: Order = {
    id: Date.now().toString(),
    userId: orderData.userId,
    items: orderData.items,
    totalPrice: orderData.totalPrice,
    status: "pending",
  };
  orders.push(newOrder);
  return newOrder;
};

/**
 * Updates an existing order status
 * @param id - The ID of the order to update
 * @param orderData - The fields to update
 * @returns The updated order
 * @throws Error if order is not found
 */
export const updateOrder = async (
  id: string,
  orderData: Pick<Order, "status">
): Promise<Order> => {
  const index: number = orders.findIndex((order: Order) => order.id === id);
  if (index === -1) {
    throw new Error(`Order with ID ${id} not found`);
  }
  orders[index] = {
    ...orders[index],
    ...orderData,
  };
  return structuredClone(orders[index]);
};

/**
 * Deletes an order
 * @param id - The ID of the order to delete
 * @throws Error if order is not found
 */
export const deleteOrder = async (id: string): Promise<void> => {
  const index: number = orders.findIndex((order: Order) => order.id === id);
  if (index === -1) {
    throw new Error(`Order with ID ${id} not found`);
  }
  orders.splice(index, 1);
};