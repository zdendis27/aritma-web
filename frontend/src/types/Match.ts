import type { Team } from "./Team";

export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  competition: string;
  date: string;
  stadium: string;
  teamId: string;
  team?: Team;
};
