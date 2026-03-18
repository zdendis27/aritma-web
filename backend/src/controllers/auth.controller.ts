import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as authService from "../services/auth.service.js";

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body.email, req.body.password);
  res.json(result);
});

export const me = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.getCurrentUser(req.user!.sub);
  res.json(user);
});
