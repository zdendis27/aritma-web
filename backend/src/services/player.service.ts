import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";

export function getPlayers() {
  return prisma.player.findMany({
    orderBy: [{ teamId: "asc" }, { number: "asc" }],
    include: {
      team: true
    }
  });
}

export function createPlayer(data: { name: string; position: string; number: number; photo: string; teamId: string }) {
  return prisma.player.create({
    data,
    include: {
      team: true
    }
  });
}

export async function updatePlayer(id: string, data: { name: string; position: string; number: number; photo: string; teamId: string }) {
  const player = await prisma.player.findUnique({ where: { id } });
  if (!player) {
    throw new ApiError(404, "Hráč nebyl nalezen.");
  }
  return prisma.player.update({
    where: { id },
    data,
    include: {
      team: true
    }
  });
}

export async function deletePlayer(id: string) {
  const player = await prisma.player.findUnique({ where: { id } });
  if (!player) {
    throw new ApiError(404, "Hráč nebyl nalezen.");
  }
  return prisma.player.delete({ where: { id } });
}
