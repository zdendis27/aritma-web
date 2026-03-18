import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as playerService from "../services/player.service.js";

export const getPlayers = catchAsync(async (_req: Request, res: Response) => {
  res.json(await playerService.getPlayers());
});

export const createPlayer = catchAsync(async (req: Request, res: Response) => {
  res.status(201).json(await playerService.createPlayer(req.body));
});

export const updatePlayer = catchAsync(async (req: Request, res: Response) => {
  res.json(await playerService.updatePlayer(req.params.id, req.body));
});

export const deletePlayer = catchAsync(async (req: Request, res: Response) => {
  await playerService.deletePlayer(req.params.id);
  res.status(204).send();
});
