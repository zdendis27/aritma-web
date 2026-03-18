import { z } from "zod";

const nullableScoreSchema = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  if (typeof value === "number" && Number.isNaN(value)) {
    return null;
  }

  return value;
}, z.number().int().min(0).nullable());

export const loginSchema = z.object({
  email: z.string().email("Zadejte platný e-mail."),
  password: z.string().min(6, "Heslo musí mít alespoň 6 znaků.")
});

export const teamSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2)
});

export const playerSchema = z.object({
  name: z.string().min(2),
  position: z.string().min(2),
  number: z.coerce.number().int().min(1).max(99),
  photo: z.string().url(),
  teamId: z.string().min(1)
});

export const matchSchema = z.object({
  homeTeam: z.string().min(2),
  awayTeam: z.string().min(2),
  homeScore: nullableScoreSchema,
  awayScore: nullableScoreSchema,
  competition: z.string().min(2),
  date: z.string().min(1),
  stadium: z.string().min(2),
  teamId: z.string().min(1)
});

export const articleSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(20),
  image: z.string().url(),
  author: z.string().min(2)
});

export const gallerySchema = z.object({
  image: z.string().url(),
  title: z.string().min(2)
});
