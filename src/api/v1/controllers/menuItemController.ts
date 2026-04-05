import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as menuItemService from "../services/menuItemService";

/**
 * Retrieves all menu items
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllMenuItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await menuItemService.getAllMenuItems();
    res.status(HTTP_STATUS.OK).json({
      message: "Menu items retrieved successfully",
      data: items,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve menu items",
    });
  }
};

/**
 * Creates a new menu item
 * @param req - Express request object
 * @param res - Express response object
 */
export const createMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, category, availability } = req.body;
    if (!name) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Menu item name is required",
      });
    } else {
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
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create menu item",
    });
  }
};

/**
 * Updates an existing menu item
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateMenuItem = async (
  req: Request,
  res: Response
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
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Menu item not found",
    });
  }
};

/**
 * Deletes a menu item
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    await menuItemService.deleteMenuItem(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Menu item not found",
    });
  }
};