import express, { Router } from "express";
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../controllers/orderController";
import { validateRequest } from "../middleware/validate";
import { orderSchemas } from "../validation/orderSchemas";

const router: Router = express.Router();

router.get("/orders", getAllOrders);
router.get("/orders/:id", validateRequest(orderSchemas.getById), getOrderById);
router.post("/orders", validateRequest(orderSchemas.create), createOrder);
router.put("/orders/:id", validateRequest(orderSchemas.update), updateOrder);
router.delete("/orders/:id", validateRequest(orderSchemas.delete), deleteOrder);

export default router;