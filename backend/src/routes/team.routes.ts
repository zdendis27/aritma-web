import { Router } from "express";
import * as teamController from "../controllers/team.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { teamSchema } from "../models/team.model.js";

const router = Router();

router.get("/", teamController.getTeams);
router.post("/", requireAuth, validate(teamSchema), teamController.createTeam);
router.put("/:id", requireAuth, validate(teamSchema), teamController.updateTeam);
router.delete("/:id", requireAuth, teamController.deleteTeam);

export default router;
