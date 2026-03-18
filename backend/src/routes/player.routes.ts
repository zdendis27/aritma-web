import { Router } from "express";
import * as playerController from "../controllers/player.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { playerSchema } from "../models/player.model.js";

const router = Router();

router.get("/", playerController.getPlayers);
router.post("/", requireAuth, validate(playerSchema), playerController.createPlayer);
router.put("/:id", requireAuth, validate(playerSchema), playerController.updatePlayer);
router.delete("/:id", requireAuth, playerController.deletePlayer);

export default router;
