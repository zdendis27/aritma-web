import api from "./api";
import type { AuthResponse, User } from "../types/User";

export const authService = {
  login: async (payload: { email: string; password: string }) =>
    (await api.post<AuthResponse>("/auth/login", payload)).data,
  me: async () => (await api.get<User>("/auth/me")).data
};
