import Joi from "joi";

export const orderSchemas = {
  // POST /orders - Create new order
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
    }),
  },
  // GET /orders/:id - Get order by ID
  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Order ID is required",
        "string.empty": "Order ID cannot be empty",
      }),
    }),
  },
  // PUT /orders/:id - Update order
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
  // DELETE /orders/:id - Delete order
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Order ID is required",
        "string.empty": "Order ID cannot be empty",
      }),
    }),
  },
};