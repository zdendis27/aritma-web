import type { Team } from "./Team";

export type Player = {
  id: string;
  name: string;
  position: string;
  number: number;
  photo: string;
  teamId: string;
  team?: Team;
};
