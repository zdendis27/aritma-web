import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(401, "Neplatné přihlašovací údaje.");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new ApiError(401, "Neplatné přihlašovací údaje.");
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role
    },
    env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true, createdAt: true }
  });

  if (!user) {
    throw new ApiError(404, "Uživatel nebyl nalezen.");
  }

  return user;
}
