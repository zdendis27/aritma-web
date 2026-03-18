import EntityManager from "./EntityManager";
import { useFetch } from "../../hooks/useFetch";
import { playerService } from "../../services/playerService";
import { teamService } from "../../services/teamService";
import { playerSchema } from "../../utils/formSchemas";
import type { Player } from "../../types/Player";

export default function AdminPlayersPage() {
  const { data: players, loading, error, setData } = useFetch(playerService.getAll, []);
  const { data: teams } = useFetch(teamService.getAll, []);

  return (
    <EntityManager<Player>
      title="Správa hráčů"
      description="Správa soupisky všech týmů s návazností na jednotlivé klubové kategorie."
      rows={players}
      loading={loading}
      error={error}
      columns={[
        { key: "name", label: "Jméno" },
        { key: "position", label: "Pozice" },
        { key: "number", label: "Číslo" },
        { key: "team", label: "Tým", render: (row) => row.team?.name ?? "" }
      ]}
      schema={playerSchema}
      fields={[
        { name: "name", label: "Jméno" },
        { name: "position", label: "Pozice" },
        { name: "number", label: "Číslo", type: "number" },
        { name: "photo", label: "URL fotky" },
        {
          name: "teamId",
          label: "Tým",
          type: "select",
          options: (teams ?? []).map((team) => ({ label: team.name, value: team.id }))
        }
      ]}
      emptyValues={{
        name: "",
        position: "",
        number: 1,
        photo: "",
        teamId: ""
      }}
      onCreate={async (values) => {
        const created = await playerService.create(values);
        setData((prev) => (prev ? [...prev, created] : [created]));
      }}
      onUpdate={async (id, values) => {
        const updated = await playerService.update(id, values);
        setData((prev) => prev?.map((row) => (row.id === id ? updated : row)) ?? []);
      }}
      onDelete={async (row) => {
        await playerService.remove(row.id);
        setData((prev) => prev?.filter((item) => item.id !== row.id) ?? []);
      }}
    />
  );
}
