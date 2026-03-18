import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";

export function getTeams() {
  return prisma.team.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      players: true,
      matches: {
        orderBy: { date: "desc" }
      }
    }
  });
}

export function createTeam(data: { name: string; category: string }) {
  return prisma.team.create({ data });
}

export async function updateTeam(id: string, data: { name: string; category: string }) {
  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) {
    throw new ApiError(404, "Tým nebyl nalezen.");
  }
  return prisma.team.update({ where: { id }, data });
}

export async function deleteTeam(id: string) {
  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) {
    throw new ApiError(404, "Tým nebyl nalezen.");
  }
  return prisma.team.delete({ where: { id } });
}
