import { z } from "zod";

export const gallerySchema = z.object({
  image: z.string().url(),
  title: z.string().min(2)
});
