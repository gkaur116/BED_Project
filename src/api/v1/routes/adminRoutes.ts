import express from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

/**
 * @openapi
 * /admin/setCustomClaims:
 *   post:
 *     summary: Set custom claims (roles) for a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - claims
 *             properties:
 *               uid:
 *                 type: string
 *                 example: "firebase-user-uid"
 *               claims:
 *                 type: object
 *                 example: { "role": "admin" }
 *     responses:
 *       '200':
 *         description: Custom claims set successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden - Admin only
 */
router.post(
  "/setCustomClaims",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  setCustomClaims
);

export default router;