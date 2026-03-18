import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as galleryService from "../services/gallery.service.js";

export const getGallery = catchAsync(async (_req: Request, res: Response) => {
  res.json(await galleryService.getGallery());
});

export const createGalleryItem = catchAsync(async (req: Request, res: Response) => {
  res.status(201).json(await galleryService.createGalleryItem(req.body));
});

export const updateGalleryItem = catchAsync(async (req: Request, res: Response) => {
  res.json(await galleryService.updateGalleryItem(req.params.id, req.body));
});

export const deleteGalleryItem = catchAsync(async (req: Request, res: Response) => {
  await galleryService.deleteGalleryItem(req.params.id);
  res.status(204).send();
});
