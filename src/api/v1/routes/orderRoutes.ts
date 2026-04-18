import express, { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";
import { validateRequest } from "../middleware/validate";
import { orderSchemas } from "../validation/orderSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all orders
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Admin only
 */
router.get(
  "/orders",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  getAllOrders
);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
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
 *         description: Order retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Order not found
 */
router.get(
  "/orders/:id",
  authenticate,
  validateRequest(orderSchemas.getById),
  getOrderById
);

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *               - totalPrice
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Caramel Latte"]
 *               totalPrice:
 *                 type: number
 *                 example: 5.99
 *               customerEmail:
 *                 type: string
 *                 example: "customer@test.com"
 *     responses:
 *       '201':
 *         description: Order created successfully
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Customer only
 */
router.post(
  "/orders",
  authenticate,
  isAuthorized({ hasRole: ["customer"] }),
  validateRequest(orderSchemas.create),
  createOrder
);

/**
 * @openapi
 * /orders/{id}:
 *   put:
 *     summary: Update an order status
 *     tags: [Orders]
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, preparing, completed]
 *                 example: "preparing"
 *     responses:
 *       '200':
 *         description: Order updated successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Admin only
 *       '404':
 *         description: Order not found
 */
router.put(
  "/orders/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(orderSchemas.update),
  updateOrder
);

/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
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
 *         description: Order deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Admin only
 *       '404':
 *         description: Order not found
 */
router.delete(
  "/orders/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(orderSchemas.delete),
  deleteOrder
);

export default router;