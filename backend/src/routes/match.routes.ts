import { Router } from "express";
import * as matchController from "../controllers/match.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { matchSchema } from "../models/match.model.js";

const router = Router();

router.get("/", matchController.getMatches);
router.get("/standings/table", matchController.getStandings);
router.get("/:id", matchController.getMatch);
router.post("/", requireAuth, validate(matchSchema), matchController.createMatch);
router.put("/:id", requireAuth, validate(matchSchema), matchController.updateMatch);
router.delete("/:id", requireAuth, matchController.deleteMatch);

export default router;
