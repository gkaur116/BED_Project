import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *         - availability
 *       properties:
 *         id:
 *           type: string
 *           example: "P5loGUcYDe3uCvNnE60n"
 *         name:
 *           type: string
 *           example: "Caramel Latte"
 *         price:
 *           type: number
 *           example: 5.99
 *         category:
 *           type: string
 *           example: "coffee"
 *         availability:
 *           type: boolean
 *           example: true
 */
export const menuItemSchemas = {
  create: {
    body: Joi.object({
      name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
      }),
      price: Joi.number().required().messages({
        "any.required": "Price is required",
      }),
      category: Joi.string().required().messages({
        "any.required": "Category is required",
        "string.empty": "Category cannot be empty",
      }),
      availability: Joi.boolean().required().messages({
        "any.required": "Availability is required",
      }),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Menu item ID is required",
        "string.empty": "Menu item ID cannot be empty",
      }),
    }),
    body: Joi.object({
      name: Joi.string().optional().messages({
        "string.empty": "Name cannot be empty",
      }),
      price: Joi.number().optional(),
      category: Joi.string().optional().messages({
        "string.empty": "Category cannot be empty",
      }),
      availability: Joi.boolean().optional(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Menu item ID is required",
        "string.empty": "Menu item ID cannot be empty",
      }),
    }),
  },
};