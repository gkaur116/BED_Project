import { Request, Response, NextFunction } from "express";

/**
 * Represents an Express middleware function
 */
export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;