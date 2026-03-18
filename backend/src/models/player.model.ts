import { z } from "zod";

export const playerSchema = z.object({
  name: z.string().min(2),
  position: z.string().min(2),
  number: z.coerce.number().int().min(1).max(99),
  photo: z.string().url(),
  teamId: z.string().min(1)
});
