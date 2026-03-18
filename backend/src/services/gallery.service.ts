import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";

export function getGallery() {
  return prisma.gallery.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export function createGalleryItem(data: { image: string; title: string }) {
  return prisma.gallery.create({ data });
}

export async function updateGalleryItem(id: string, data: { image: string; title: string }) {
  const item = await prisma.gallery.findUnique({ where: { id } });
  if (!item) {
    throw new ApiError(404, "Fotografie nebyla nalezena.");
  }
  return prisma.gallery.update({ where: { id }, data });
}

export async function deleteGalleryItem(id: string) {
  const item = await prisma.gallery.findUnique({ where: { id } });
  if (!item) {
    throw new ApiError(404, "Fotografie nebyla nalezena.");
  }
  return prisma.gallery.delete({ where: { id } });
}
