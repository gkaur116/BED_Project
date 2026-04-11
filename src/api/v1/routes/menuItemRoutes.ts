import express, { Router } from "express";
import { getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuItemController";
import { validateRequest } from "../middleware/validate";
import { menuItemSchemas } from "../validation/menuItemSchemas";

const router: Router = express.Router();

router.get("/menu-items", getAllMenuItems);
router.post("/menu-items", validateRequest(menuItemSchemas.create), createMenuItem);
router.put("/menu-items/:id", validateRequest(menuItemSchemas.update), updateMenuItem);
router.delete("/menu-items/:id", validateRequest(menuItemSchemas.delete), deleteMenuItem);

export default router;