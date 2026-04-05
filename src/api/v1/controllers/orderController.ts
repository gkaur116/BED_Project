import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as orderService from "../services/orderService";

/**
 * Retrieves all orders
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(HTTP_STATUS.OK).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve orders",
    });
  }
};

/**
 * Retrieves a single order by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const order = await orderService.getOrderById(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Order not found",
    });
  }
};

/**
 * Creates a new order
 * @param req - Express request object
 * @param res - Express response object
 */
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, items, totalPrice } = req.body;
    if (!userId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "User ID is required",
      });
    } else {
      const newOrder = await orderService.createOrder({
        userId,
        items,
        totalPrice,
      });
      res.status(HTTP_STATUS.CREATED).json({
        message: "Order created successfully",
        data: newOrder,
      });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create order",
    });
  }
};

/**
 * Updates an existing order
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrder(id, { status });
    res.status(HTTP_STATUS.OK).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Order not found",
    });
  }
};

/**
 * Deletes an order
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    await orderService.deleteOrder(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Order not found",
    });
  }
};