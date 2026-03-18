export type User = {
  id: string;
  email: string;
  role: string;
  createdAt?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
