import api from "./api";
import type { Player } from "../types/Player";

export const playerService = {
  getAll: async () => (await api.get<Player[]>("/players")).data,
  create: async (payload: Omit<Player, "id" | "team">) => (await api.post<Player>("/players", payload)).data,
  update: async (id: string, payload: Omit<Player, "id" | "team">) => (await api.put<Player>(`/players/${id}`, payload)).data,
  remove: async (id: string) => api.delete(`/players/${id}`)
};
