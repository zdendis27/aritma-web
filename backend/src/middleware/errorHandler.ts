import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({
    message: "Došlo k neočekávané chybě serveru."
  });
}
