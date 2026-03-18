import api from "./api";
import type { Article } from "../types/Article";

export const articleService = {
  getAll: async () => (await api.get<Article[]>("/articles")).data,
  create: async (payload: Omit<Article, "id" | "createdAt">) => (await api.post<Article>("/articles", payload)).data,
  update: async (id: string, payload: Omit<Article, "id" | "createdAt">) => (await api.put<Article>(`/articles/${id}`, payload)).data,
  remove: async (id: string) => api.delete(`/articles/${id}`)
};
