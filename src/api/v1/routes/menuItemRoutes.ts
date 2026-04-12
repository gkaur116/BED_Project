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

router.get("/menu-items", authenticate, getAllMenuItems);
router.post(
  "/menu-items",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(menuItemSchemas.create),
  createMenuItem
);
router.put(
  "/menu-items/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(menuItemSchemas.update),
  updateMenuItem
);
router.delete(
  "/menu-items/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(menuItemSchemas.delete),
  deleteMenuItem
);

export default router;