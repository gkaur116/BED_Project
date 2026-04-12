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

router.get(
  "/orders",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  getAllOrders
);
router.get(
  "/orders/:id",
  authenticate,
  validateRequest(orderSchemas.getById),
  getOrderById
);
router.post(
  "/orders",
  authenticate,
  isAuthorized({ hasRole: ["admin", "user"] }),
  validateRequest(orderSchemas.create),
  createOrder
);
router.put(
  "/orders/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(orderSchemas.update),
  updateOrder
);
router.delete(
  "/orders/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(orderSchemas.delete),
  deleteOrder
);

export default router;