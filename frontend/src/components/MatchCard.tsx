import type { Match } from "../types/Match";
import { formatDate, scoreLabel } from "../utils/formatters";

export default function MatchCard({ match }: { match: Match }) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm font-semibold uppercase leading-[1.45] tracking-[0.14em] text-primary/70">{match.competition}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-lg font-bold leading-snug text-slate-900">{match.homeTeam}</p>
          <p className="text-sm text-slate-500">vs {match.awayTeam}</p>
        </div>
        <div className="rounded-full bg-primary px-4 py-2 text-lg font-bold text-white">
          {scoreLabel(match.homeScore, match.awayScore)}
        </div>
      </div>
      <div className="mt-5 space-y-1 text-sm text-slate-600">
        <p>{formatDate(match.date)}</p>
        <p>{match.stadium}</p>
      </div>
    </article>
  );
}
