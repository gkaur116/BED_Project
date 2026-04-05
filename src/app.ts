import express, { Express } from "express";
import morgan from "morgan";
import healthRoutes from "./api/v1/routes/healthRoutes";
import menuItemRoutes from "./api/v1/routes/menuItemRoutes";
import orderRoutes from "./api/v1/routes/orderRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";

// Initialize Express application
const app: Express = express();

// Middleware
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1", menuItemRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", reviewRoutes);

export default app;