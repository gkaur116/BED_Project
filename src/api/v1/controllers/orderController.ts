import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as orderService from "../services/orderService";

/**
 * Retrieves all orders
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(HTTP_STATUS.OK).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Retrieves a single order by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const order = await orderService.getOrderById(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Creates a new order
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, items, totalPrice, customerEmail } = req.body;
    const newOrder = await orderService.createOrder({
      userId,
      items,
      totalPrice,
      customerEmail,
    });
    res.status(HTTP_STATUS.CREATED).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Updates an existing order
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrder(id, { status });
    res.status(HTTP_STATUS.OK).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Deletes an order
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    await orderService.deleteOrder(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Order deleted successfully",
    });
  } catch (error: unknown) {
    next(error);
  }
};