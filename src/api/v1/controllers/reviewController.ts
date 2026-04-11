import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as reviewService from "../services/reviewService";

/**
 * Retrieves all reviews for a menu item
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getReviewsByMenuItemId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const menuItemId: string = req.params.menuItemId;
    const reviews = await reviewService.getReviewsByMenuItemId(menuItemId);
    res.status(HTTP_STATUS.OK).json({
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Creates a new review
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, menuItemId, rating, comment } = req.body;
    const newReview = await reviewService.createReview({
      userId,
      menuItemId,
      rating,
      comment,
    });
    res.status(HTTP_STATUS.CREATED).json({
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Deletes a review
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    await reviewService.deleteReview(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Review deleted successfully",
    });
  } catch (error: unknown) {
    next(error);
  }
};