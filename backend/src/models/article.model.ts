import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(20),
  image: z.string().url(),
  author: z.string().min(2)
});
