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

router.get(
  "/reviews/:menuItemId",
  authenticate,
  validateRequest(reviewSchemas.getByMenuItemId),
  getReviewsByMenuItemId
);
router.post(
  "/reviews",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"] }),
  validateRequest(reviewSchemas.create),
  createReview
);
router.delete(
  "/reviews/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(reviewSchemas.delete),
  deleteReview
);

export default router;