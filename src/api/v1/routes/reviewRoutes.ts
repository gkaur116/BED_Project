import express, { Router } from "express";
import { getReviewsByMenuItemId, createReview, deleteReview } from "../controllers/reviewController";

const router: Router = express.Router();

router.get("/reviews/:menuItemId", getReviewsByMenuItemId);
router.post("/reviews", createReview);
router.delete("/reviews/:id", deleteReview);

export default router;