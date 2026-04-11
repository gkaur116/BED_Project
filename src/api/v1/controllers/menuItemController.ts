import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as menuItemService from "../services/menuItemService";

/**
 * Retrieves all menu items
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await menuItemService.getAllMenuItems();
    res.status(HTTP_STATUS.OK).json({
      message: "Menu items retrieved successfully",
      data: items,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Creates a new menu item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, category, availability } = req.body;
    const newItem = await menuItemService.createMenuItem({
      name,
      price,
      category,
      availability,
    });
    res.status(HTTP_STATUS.CREATED).json({
      message: "Menu item created successfully",
      data: newItem,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Updates an existing menu item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const { name, price, category, availability } = req.body;
    const updatedItem = await menuItemService.updateMenuItem(id, {
      name,
      price,
      category,
      availability,
    });
    res.status(HTTP_STATUS.OK).json({
      message: "Menu item updated successfully",
      data: updatedItem,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Deletes a menu item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    await menuItemService.deleteMenuItem(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Menu item deleted successfully",
    });
  } catch (error: unknown) {
    next(error);
  }
};