import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as teamService from "../services/team.service.js";

export const getTeams = catchAsync(async (_req: Request, res: Response) => {
  res.json(await teamService.getTeams());
});

export const createTeam = catchAsync(async (req: Request, res: Response) => {
  res.status(201).json(await teamService.createTeam(req.body));
});

export const updateTeam = catchAsync(async (req: Request, res: Response) => {
  res.json(await teamService.updateTeam(req.params.id, req.body));
});

export const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  await teamService.deleteTeam(req.params.id);
  res.status(204).send();
});
