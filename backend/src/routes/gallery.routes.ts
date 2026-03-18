import { Router } from "express";
import * as galleryController from "../controllers/gallery.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { gallerySchema } from "../models/gallery.model.js";

const router = Router();

router.get("/", galleryController.getGallery);
router.post("/", requireAuth, validate(gallerySchema), galleryController.createGalleryItem);
router.put("/:id", requireAuth, validate(gallerySchema), galleryController.updateGalleryItem);
router.delete("/:id", requireAuth, galleryController.deleteGalleryItem);

export default router;
