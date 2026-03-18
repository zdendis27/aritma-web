import api from "./api";
import type { Match } from "../types/Match";
import type { Standing } from "../types/Standing";

export const matchService = {
  getAll: async () => (await api.get<Match[]>("/matches")).data,
  getById: async (id: string) => (await api.get<Match>(`/matches/${id}`)).data,
  create: async (payload: Omit<Match, "id" | "team">) => (await api.post<Match>("/matches", payload)).data,
  update: async (id: string, payload: Omit<Match, "id" | "team">) => (await api.put<Match>(`/matches/${id}`, payload)).data,
  remove: async (id: string) => api.delete(`/matches/${id}`),
  getStandings: async () => (await api.get<Standing[]>("/matches/standings/table")).data
};
