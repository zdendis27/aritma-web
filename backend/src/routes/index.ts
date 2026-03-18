import { Router } from "express";
import authRoutes from "./auth.routes.js";
import matchRoutes from "./match.routes.js";
import teamRoutes from "./team.routes.js";
import playerRoutes from "./player.routes.js";
import articleRoutes from "./article.routes.js";
import galleryRoutes from "./gallery.routes.js";
import * as matchController from "../controllers/match.controller.js";

const router = Router();

router.use("/auth", authRoutes);
router.get("/standings", matchController.getStandings);
router.use("/matches", matchRoutes);
router.use("/teams", teamRoutes);
router.use("/players", playerRoutes);
router.use("/articles", articleRoutes);
router.use("/gallery", galleryRoutes);

export default router;
