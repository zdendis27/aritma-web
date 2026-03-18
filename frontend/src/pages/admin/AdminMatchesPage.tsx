import EntityManager from "./EntityManager";
import { useFetch } from "../../hooks/useFetch";
import { matchService } from "../../services/matchService";
import { teamService } from "../../services/teamService";
import { matchSchema } from "../../utils/formSchemas";
import { formatDate, scoreLabel } from "../../utils/formatters";
import type { Match } from "../../types/Match";

export default function AdminMatchesPage() {
  const { data: matches, loading, error, setData } = useFetch(matchService.getAll, []);
  const { data: teams } = useFetch(teamService.getAll, []);

  const teamOptions = (teams ?? []).map((team) => ({ label: team.name, value: team.id }));

  return (
    <EntityManager<Match>
      title="Správa zápasů"
      description="Přidávání, editace a mazání zápasů napříč klubovými kategoriemi."
      rows={matches}
      loading={loading}
      error={error}
      columns={[
        { key: "homeTeam", label: "Domácí" },
        { key: "awayTeam", label: "Hosté" },
        { key: "score", label: "Výsledek", render: (row) => scoreLabel(row.homeScore, row.awayScore) },
        { key: "date", label: "Datum", render: (row) => formatDate(row.date) }
      ]}
      schema={matchSchema}
      fields={[
        { name: "homeTeam", label: "Domácí tým" },
        { name: "awayTeam", label: "Hostující tým" },
        { name: "competition", label: "Soutěž" },
        { name: "stadium", label: "Stadion" },
        { name: "homeScore", label: "Domácí skóre", type: "number" },
        { name: "awayScore", label: "Hostující skóre", type: "number" },
        { name: "date", label: "Datum", type: "datetime-local" },
        { name: "teamId", label: "Kategorie", type: "select", options: teamOptions }
      ]}
      emptyValues={{
        homeTeam: "",
        awayTeam: "",
        homeScore: null,
        awayScore: null,
        competition: "",
        date: "",
        stadium: "",
        teamId: ""
      }}
      mapSelectedToFormValues={(row) => ({
        homeTeam: row.homeTeam,
        awayTeam: row.awayTeam,
        homeScore: row.homeScore,
        awayScore: row.awayScore,
        competition: row.competition,
        date: row.date.slice(0, 16),
        stadium: row.stadium,
        teamId: row.teamId
      })}
      transformSubmit={(values) => ({
        ...values,
        homeScore: values.homeScore === null ? null : Number(values.homeScore),
        awayScore: values.awayScore === null ? null : Number(values.awayScore),
        date: new Date(values.date).toISOString()
      })}
      onCreate={async (values) => {
        const created = await matchService.create(values);
        setData((prev) => (prev ? [created, ...prev] : [created]));
      }}
      onUpdate={async (id, values) => {
        const updated = await matchService.update(id, values);
        setData((prev) => prev?.map((row) => (row.id === id ? updated : row)) ?? []);
      }}
      onDelete={async (row) => {
        await matchService.remove(row.id);
        setData((prev) => prev?.filter((item) => item.id !== row.id) ?? []);
      }}
    />
  );
}
