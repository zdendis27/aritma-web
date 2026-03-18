import SectionTitle from "../components/SectionTitle";
import PlayerCard from "../components/PlayerCard";
import EmptyState from "../components/EmptyState";
import { teamService } from "../services/teamService";
import { useFetch } from "../hooks/useFetch";

export default function TeamsPage() {
  const { data: teams, loading, error } = useFetch(teamService.getAll, []);

  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Týmy"
        title="Kategorie klubu"
        description="Přehled týmů od A týmu po mládežnické kategorie, včetně hráčů a posledních zápasů."
      />

      {loading ? <EmptyState message="Načítám týmy..." /> : null}
      {error ? <EmptyState message={error} /> : null}

      <div className="space-y-10">
        {(teams ?? []).map((team) => (
          <section key={team.id} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-3xl font-bold text-slate-900">{team.name}</h3>
                <p className="text-sm uppercase tracking-[0.2em] text-primary/70">{team.category}</p>
              </div>
              <div className="flex gap-6 text-sm text-slate-500">
                <span>Hráči: {team.players?.length ?? 0}</span>
                <span>Zápasy: {team.matches?.length ?? 0}</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {(team.players ?? []).map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>

            {!(team.players?.length ?? 0) ? <EmptyState message="Pro tento tým zatím nejsou evidováni hráči." /> : null}
          </section>
        ))}
      </div>
    </div>
  );
}
