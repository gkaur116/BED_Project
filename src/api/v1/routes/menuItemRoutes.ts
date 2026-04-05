import express, { Router } from "express";
import { getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuItemController";

const router: Router = express.Router();

router.get("/menu-items", getAllMenuItems);
router.post("/menu-items", createMenuItem);
router.put("/menu-items/:id", updateMenuItem);
router.delete("/menu-items/:id", deleteMenuItem);

export default router;