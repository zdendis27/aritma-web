import api from "./api";
import type { GalleryItem } from "../types/Gallery";

export const galleryService = {
  getAll: async () => (await api.get<GalleryItem[]>("/gallery")).data,
  create: async (payload: Omit<GalleryItem, "id" | "createdAt">) => (await api.post<GalleryItem>("/gallery", payload)).data,
  update: async (id: string, payload: Omit<GalleryItem, "id" | "createdAt">) =>
    (await api.put<GalleryItem>(`/gallery/${id}`, payload)).data,
  remove: async (id: string) => api.delete(`/gallery/${id}`)
};
