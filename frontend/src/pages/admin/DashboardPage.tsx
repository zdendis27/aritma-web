import SectionTitle from "../../components/SectionTitle";
import EmptyState from "../../components/EmptyState";
import { useFetch } from "../../hooks/useFetch";
import { matchService } from "../../services/matchService";
import { teamService } from "../../services/teamService";
import { playerService } from "../../services/playerService";
import { articleService } from "../../services/articleService";

export default function DashboardPage() {
  const { data: matches } = useFetch(matchService.getAll, []);
  const { data: teams } = useFetch(teamService.getAll, []);
  const { data: players } = useFetch(playerService.getAll, []);
  const { data: articles } = useFetch(articleService.getAll, []);

  const stats = [
    { label: "Zápasy", value: matches?.length ?? 0 },
    { label: "Týmy", value: teams?.length ?? 0 },
    { label: "Hráči", value: players?.length ?? 0 },
    { label: "Články", value: articles?.length ?? 0 }
  ];

  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Dashboard"
        title="Přehled administrace"
        description="Rychlý přehled obsahu a dat, která jsou aktuálně spravována v systému."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{stat.label}</p>
            <p className="mt-3 text-4xl font-black text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <EmptyState message="V levé části panelu můžete spravovat zápasy, týmy, hráče, novinky i galerii." />
    </div>
  );
}
