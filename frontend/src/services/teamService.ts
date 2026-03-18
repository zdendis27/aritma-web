import api from "./api";
import type { Team } from "../types/Team";

export const teamService = {
  getAll: async () => (await api.get<Team[]>("/teams")).data,
  create: async (payload: Pick<Team, "name" | "category">) => (await api.post<Team>("/teams", payload)).data,
  update: async (id: string, payload: Pick<Team, "name" | "category">) => (await api.put<Team>(`/teams/${id}`, payload)).data,
  remove: async (id: string) => api.delete(`/teams/${id}`)
};
