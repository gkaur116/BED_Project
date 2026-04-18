import express, { Router } from "express";
import {
  getReviewsByMenuItemId,
  createReview,
  deleteReview,
} from "../controllers/reviewController";
import { validateRequest } from "../middleware/validate";
import { reviewSchemas } from "../validation/reviewSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /reviews/{menuItemId}:
 *   get:
 *     summary: Get all reviews for a menu item
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: menuItemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of reviews for the menu item
 *       '401':
 *         description: Unauthorized
 */
router.get(
  "/reviews/:menuItemId",
  authenticate,
  validateRequest(reviewSchemas.getByMenuItemId),
  getReviewsByMenuItemId
);

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
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
 *               - menuItemId
 *               - rating
 *               - comment
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               menuItemId:
 *                 type: string
 *                 example: "P5loGUcYDe3uCvNnE60n"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Amazing coffee!"
 *     responses:
 *       '201':
 *         description: Review created successfully
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Customer only
 */
router.post(
  "/reviews",
  authenticate,
  isAuthorized({ hasRole: ["customer"] }),
  validateRequest(reviewSchemas.create),
  createReview
);

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
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
 *         description: Review deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Admin only
 *       '404':
 *         description: Review not found
 */
router.delete(
  "/reviews/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(reviewSchemas.delete),
  deleteReview
);

export default router;