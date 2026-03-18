import { z } from "zod";

export const matchSchema = z.object({
  homeTeam: z.string().min(2),
  awayTeam: z.string().min(2),
  homeScore: z.coerce.number().int().min(0).nullable(),
  awayScore: z.coerce.number().int().min(0).nullable(),
  competition: z.string().min(2),
  date: z.string().datetime(),
  stadium: z.string().min(2),
  teamId: z.string().min(1)
});
