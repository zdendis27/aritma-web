import type { Match } from "./Match";
import type { Player } from "./Player";

export type Team = {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  players?: Player[];
  matches?: Match[];
};
