import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";

export function getArticles() {
  return prisma.article.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export function createArticle(data: { title: string; content: string; image: string; author: string }) {
  return prisma.article.create({ data });
}

export async function updateArticle(id: string, data: { title: string; content: string; image: string; author: string }) {
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) {
    throw new ApiError(404, "Článek nebyl nalezen.");
  }
  return prisma.article.update({ where: { id }, data });
}

export async function deleteArticle(id: string) {
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) {
    throw new ApiError(404, "Článek nebyl nalezen.");
  }
  return prisma.article.delete({ where: { id } });
}
