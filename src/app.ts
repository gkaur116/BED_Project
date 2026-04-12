import express, { Express } from "express";
import {
  accessLogger,
  errorLogger,
  consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import healthRoutes from "./api/v1/routes/healthRoutes";
import menuItemRoutes from "./api/v1/routes/menuItemRoutes";
import orderRoutes from "./api/v1/routes/orderRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

// Initialize Express application
const app: Express = express();

// Logging middleware
if (process.env.NODE_ENV === "production") {
  app.use(accessLogger);
  app.use(errorLogger);
} else {
  app.use(consoleLogger);
}

// Body parsing middleware
app.use(express.json());

// Routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1", menuItemRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;