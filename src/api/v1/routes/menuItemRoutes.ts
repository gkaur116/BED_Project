import express, { Router } from "express";
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController";
import { validateRequest } from "../middleware/validate";
import { menuItemSchemas } from "../validation/menuItemSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /menu-items:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all menu items
 *       '401':
 *         description: Unauthorized
 */
router.get("/menu-items", authenticate, getAllMenuItems);

/**
 * @openapi
 * /menu-items:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *               - availability
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Caramel Latte"
 *               price:
 *                 type: number
 *                 example: 5.99
 *               category:
 *                 type: string
 *                 example: "coffee"
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '201':
 *         description: Menu item created successfully
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Admin only
 */
router.post(
  "/menu-items",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(menuItemSchemas.create),
  createMenuItem
);

/**
 * @openapi
 * /menu-items/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               availability:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Menu item updated successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Admin only
 *       '404':
 *         description: Menu item not found
 */
router.put(
  "/menu-items/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(menuItemSchemas.update),
  updateMenuItem
);

/**
 * @openapi
 * /menu-items/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Menu item deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Admin only
 *       '404':
 *         description: Menu item not found
 */
router.delete(
  "/menu-items/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(menuItemSchemas.delete),
  deleteMenuItem
);

export default router;