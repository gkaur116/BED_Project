import express, { Router } from "express";
import { getReviewsByMenuItemId, createReview, deleteReview } from "../controllers/reviewController";
import { validateRequest } from "../middleware/validate";
import { reviewSchemas } from "../validation/reviewSchemas";

const router: Router = express.Router();

router.get("/reviews/:menuItemId", validateRequest(reviewSchemas.getByMenuItemId), getReviewsByMenuItemId);
router.post("/reviews", validateRequest(reviewSchemas.create), createReview);
router.delete("/reviews/:id", validateRequest(reviewSchemas.delete), deleteReview);

export default router;