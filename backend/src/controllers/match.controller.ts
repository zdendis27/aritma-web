import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as matchService from "../services/match.service.js";

export const getMatches = catchAsync(async (_req: Request, res: Response) => {
  res.json(await matchService.getMatches());
});

export const getMatch = catchAsync(async (req: Request, res: Response) => {
  res.json(await matchService.getMatchById(req.params.id));
});

export const createMatch = catchAsync(async (req: Request, res: Response) => {
  res.status(201).json(await matchService.createMatch(req.body));
});

export const updateMatch = catchAsync(async (req: Request, res: Response) => {
  res.json(await matchService.updateMatch(req.params.id, req.body));
});

export const deleteMatch = catchAsync(async (req: Request, res: Response) => {
  await matchService.deleteMatch(req.params.id);
  res.status(204).send();
});

export const getStandings = catchAsync(async (_req: Request, res: Response) => {
  res.json(await matchService.getStandings());
});
