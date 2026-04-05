import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as reviewService from "../services/reviewService";

/**
 * Retrieves all reviews for a menu item
 * @param req - Express request object
 * @param res - Express response object
 */
export const getReviewsByMenuItemId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const menuItemId: string = req.params.menuItemId;
    const reviews = await reviewService.getReviewsByMenuItemId(menuItemId);
    res.status(HTTP_STATUS.OK).json({
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve reviews",
    });
  }
};

/**
 * Creates a new review
 * @param req - Express request object
 * @param res - Express response object
 */
export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, menuItemId, rating, comment } = req.body;
    if (!userId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "User ID is required",
      });
    } else {
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
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create review",
    });
  }
};

/**
 * Deletes a review
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    await reviewService.deleteReview(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Review not found",
    });
  }
};