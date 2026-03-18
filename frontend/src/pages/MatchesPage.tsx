import SectionTitle from "../components/SectionTitle";
import MatchCard from "../components/MatchCard";
import EmptyState from "../components/EmptyState";
import { matchService } from "../services/matchService";
import { useFetch } from "../hooks/useFetch";
import { isUpcoming } from "../utils/formatters";

export default function MatchesPage() {
  const { data: matches, loading, error } = useFetch(matchService.getAll, []);
  const { data: standings } = useFetch(matchService.getStandings, []);

  const recent = (matches ?? []).filter((match) => !isUpcoming(match.date));
  const upcoming = (matches ?? []).filter((match) => isUpcoming(match.date));

  return (
    <div className="space-y-14">
      <SectionTitle
        eyebrow="Zápasy"
        title="Výsledky a program"
        description="Sledujte poslední výsledky i nejbližší utkání všech kategorií SK Aritma Praha."
      />

      {loading ? <EmptyState message="Načítám zápasy..." /> : null}
      {error ? <EmptyState message={error} /> : null}

      {!loading && !error ? (
        <>
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Budoucí zápasy</h3>
            {upcoming.length ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {upcoming.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <EmptyState message="V tuto chvíli nejsou žádné budoucí zápasy." />
            )}
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Poslední výsledky</h3>
            {recent.length ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {recent.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <EmptyState message="V tuto chvíli nejsou žádné odehrané zápasy." />
            )}
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Tabulka ligy</h3>
            {standings?.length ? (
              <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        {["Tým", "Z", "V", "R", "P", "Skóre", "Body"].map((label) => (
                          <th key={label} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {standings.map((row) => (
                        <tr key={row.team}>
                          <td className="px-4 py-4 text-sm font-semibold text-slate-900">{row.team}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{row.played}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{row.wins}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{row.draws}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{row.losses}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">
                            {row.goalsFor}:{row.goalsAgainst}
                          </td>
                          <td className="px-4 py-4 text-sm font-bold text-primary">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EmptyState message="Tabulka se zobrazí po odehrání prvních zápasů." />
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
