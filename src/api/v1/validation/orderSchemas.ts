import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - items
 *         - totalPrice
 *       properties:
 *         id:
 *           type: string
 *           example: "04NnMEfmuMxTpHAqaxKR"
 *         userId:
 *           type: string
 *           example: "user123"
 *         items:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Caramel Latte"]
 *         totalPrice:
 *           type: number
 *           example: 5.99
 *         status:
 *           type: string
 *           enum: [pending, preparing, completed]
 *           example: "pending"
 *         customerEmail:
 *           type: string
 *           example: "customer@test.com"
 */
export const orderSchemas = {
  create: {
    body: Joi.object({
      userId: Joi.string().required().messages({
        "any.required": "User ID is required",
        "string.empty": "User ID cannot be empty",
      }),
      items: Joi.array().items(Joi.string()).required().messages({
        "any.required": "Items are required",
      }),
      totalPrice: Joi.number().required().messages({
        "any.required": "Total price is required",
      }),
      customerEmail: Joi.string().optional(),
    }),
  },
  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Order ID is required",
        "string.empty": "Order ID cannot be empty",
      }),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Order ID is required",
        "string.empty": "Order ID cannot be empty",
      }),
    }),
    body: Joi.object({
      status: Joi.string()
        .valid("pending", "preparing", "completed")
        .required()
        .messages({
          "any.required": "Status is required",
          "string.empty": "Status cannot be empty",
          "any.only": "Status must be pending, preparing or completed",
        }),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Order ID is required",
        "string.empty": "Order ID cannot be empty",
      }),
    }),
  },
};