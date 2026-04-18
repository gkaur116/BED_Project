import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - userId
 *         - menuItemId
 *         - rating
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           example: "RZVZ3BMLfnt11yZX3WyA"
 *         userId:
 *           type: string
 *           example: "user123"
 *         menuItemId:
 *           type: string
 *           example: "P5loGUcYDe3uCvNnE60n"
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: "Amazing coffee!"
 */
export const reviewSchemas = {
  create: {
    body: Joi.object({
      userId: Joi.string().required().messages({
        "any.required": "User ID is required",
        "string.empty": "User ID cannot be empty",
      }),
      menuItemId: Joi.string().required().messages({
        "any.required": "Menu item ID is required",
        "string.empty": "Menu item ID cannot be empty",
      }),
      rating: Joi.number().min(1).max(5).required().messages({
        "any.required": "Rating is required",
        "number.min": "Rating must be at least 1",
        "number.max": "Rating must be at most 5",
      }),
      comment: Joi.string().required().messages({
        "any.required": "Comment is required",
        "string.empty": "Comment cannot be empty",
      }),
    }),
  },
  getByMenuItemId: {
    params: Joi.object({
      menuItemId: Joi.string().required().messages({
        "any.required": "Menu item ID is required",
        "string.empty": "Menu item ID cannot be empty",
      }),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Review ID is required",
        "string.empty": "Review ID cannot be empty",
      }),
    }),
  },
};