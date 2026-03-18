import { z } from "zod";

export const teamSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2)
});
