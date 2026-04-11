import Joi from "joi";

export const menuItemSchemas = {
  // POST /menu-items - Create new menu item
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
  // PUT /menu-items/:id - Update menu item
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
  // DELETE /menu-items/:id - Delete menu item
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Menu item ID is required",
        "string.empty": "Menu item ID cannot be empty",
      }),
    }),
  },
};