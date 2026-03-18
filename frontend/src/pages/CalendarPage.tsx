import SectionTitle from "../components/SectionTitle";
import EmptyState from "../components/EmptyState";
import { matchService } from "../services/matchService";
import { useFetch } from "../hooks/useFetch";
import { formatDate } from "../utils/formatters";

export default function CalendarPage() {
  const { data: matches, loading, error } = useFetch(matchService.getAll, []);

  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Kalendář"
        title="Kalendář zápasů"
        description="Chronologický přehled programu celého klubu."
      />
      {loading ? <EmptyState message="Načítám kalendář..." /> : null}
      {error ? <EmptyState message={error} /> : null}
      <div className="space-y-4">
        {(matches ?? [])
          .slice()
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((match) => (
            <div key={match.id} className="grid gap-3 rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-[180px_1fr_180px] md:items-center">
              <div className="text-sm font-semibold text-primary">{formatDate(match.date)}</div>
              <div>
                <p className="text-lg font-bold text-slate-900">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
                <p className="text-sm text-slate-500">{match.competition}</p>
              </div>
              <div className="text-sm text-slate-600">{match.stadium}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
