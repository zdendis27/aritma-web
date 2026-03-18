import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";

export function getMatches() {
  return prisma.match.findMany({
    orderBy: { date: "desc" },
    include: {
      team: true
    }
  });
}

export async function getMatchById(id: string) {
  const match = await prisma.match.findUnique({
    where: { id },
    include: { team: true }
  });
  if (!match) {
    throw new ApiError(404, "Zápas nebyl nalezen.");
  }
  return match;
}

export function createMatch(data: {
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  competition: string;
  date: string;
  stadium: string;
  teamId: string;
}) {
  return prisma.match.create({
    data: {
      ...data,
      date: new Date(data.date)
    }
  });
}

export async function updateMatch(
  id: string,
  data: {
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    competition: string;
    date: string;
    stadium: string;
    teamId: string;
  }
) {
  const match = await prisma.match.findUnique({ where: { id } });
  if (!match) {
    throw new ApiError(404, "Zápas nebyl nalezen.");
  }
  return prisma.match.update({
    where: { id },
    data: {
      ...data,
      date: new Date(data.date)
    }
  });
}

export async function deleteMatch(id: string) {
  const match = await prisma.match.findUnique({ where: { id } });
  if (!match) {
    throw new ApiError(404, "Zápas nebyl nalezen.");
  }
  return prisma.match.delete({ where: { id } });
}

export async function getStandings() {
  const matches = await prisma.match.findMany({
    where: {
      homeScore: { not: null },
      awayScore: { not: null }
    }
  });

  const table = new Map<string, { team: string; played: number; wins: number; draws: number; losses: number; goalsFor: number; goalsAgainst: number; points: number }>();

  const ensureTeam = (name: string) => {
    if (!table.has(name)) {
      table.set(name, {
        team: name,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0
      });
    }
    return table.get(name)!;
  };

  matches.forEach((match) => {
    const home = ensureTeam(match.homeTeam);
    const away = ensureTeam(match.awayTeam);
    const homeScore = match.homeScore ?? 0;
    const awayScore = match.awayScore ?? 0;

    home.played += 1;
    away.played += 1;
    home.goalsFor += homeScore;
    home.goalsAgainst += awayScore;
    away.goalsFor += awayScore;
    away.goalsAgainst += homeScore;

    if (homeScore > awayScore) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (homeScore < awayScore) {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }
  });

  return [...table.values()].sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));
}
