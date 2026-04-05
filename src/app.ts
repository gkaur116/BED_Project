import express, { Express } from "express";
import morgan from "morgan";
import healthRoutes from "./api/v1/routes/healthRoutes";

// Initialize Express application
const app: Express = express();

// Middleware
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.use("/api/v1", healthRoutes);

export default app;