import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as articleService from "../services/article.service.js";

export const getArticles = catchAsync(async (_req: Request, res: Response) => {
  res.json(await articleService.getArticles());
});

export const createArticle = catchAsync(async (req: Request, res: Response) => {
  res.status(201).json(await articleService.createArticle(req.body));
});

export const updateArticle = catchAsync(async (req: Request, res: Response) => {
  res.json(await articleService.updateArticle(req.params.id, req.body));
});

export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  await articleService.deleteArticle(req.params.id);
  res.status(204).send();
});
