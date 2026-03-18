import { Router } from "express";
import * as articleController from "../controllers/article.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { articleSchema } from "../models/article.model.js";

const router = Router();

router.get("/", articleController.getArticles);
router.post("/", requireAuth, validate(articleSchema), articleController.createArticle);
router.put("/:id", requireAuth, validate(articleSchema), articleController.updateArticle);
router.delete("/:id", requireAuth, articleController.deleteArticle);

export default router;
