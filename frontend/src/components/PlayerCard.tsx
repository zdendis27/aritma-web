import type { Player } from "../types/Player";

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
      <img src={player.photo} alt={player.name} className="h-64 w-full object-cover" />
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold leading-[1.2] text-slate-900">{player.name}</h3>
          <span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">{player.number}</span>
        </div>
        <p className="text-sm font-medium text-primary">{player.position}</p>
        <p className="text-sm text-slate-500">{player.team?.name}</p>
      </div>
    </article>
  );
}
