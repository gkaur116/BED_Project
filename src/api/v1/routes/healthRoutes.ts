import express, { Router } from "express";

const router: Router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check server health status
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 *                 timestamp:
 *                   type: string
 *                   example: "2024-01-15T10:30:00Z"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 */
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;