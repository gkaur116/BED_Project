import Joi from "joi";

export const reviewSchemas = {
  // POST /reviews - Create new review
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
  // GET /reviews/:menuItemId - Get reviews by menu item ID
  getByMenuItemId: {
    params: Joi.object({
      menuItemId: Joi.string().required().messages({
        "any.required": "Menu item ID is required",
        "string.empty": "Menu item ID cannot be empty",
      }),
    }),
  },
  // DELETE /reviews/:id - Delete review
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Review ID is required",
        "string.empty": "Review ID cannot be empty",
      }),
    }),
  },
};