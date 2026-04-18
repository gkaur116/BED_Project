import dotenv from "dotenv";
// Load environment variables BEFORE your internal imports!
dotenv.config();

import express, { Express } from "express";
import { getHelmetConfig } from "./config/helmetConfig";
import cors from "cors";
import { getCorsOptions } from "./config/corsConfig";
import {
  accessLogger,
  errorLogger,
  consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import setupSwagger from "./config/swagger";
import healthRoutes from "./api/v1/routes/healthRoutes";
import menuItemRoutes from "./api/v1/routes/menuItemRoutes";
import orderRoutes from "./api/v1/routes/orderRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

// Initialize Express application
const app: Express = express();

// Security middleware
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

// Logging middleware
if (process.env.NODE_ENV === "production") {
  app.use(accessLogger);
  app.use(errorLogger);
} else {
  app.use(consoleLogger);
}

// Body parsing middleware
app.use(express.json());

// Swagger documentation
setupSwagger(app);

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