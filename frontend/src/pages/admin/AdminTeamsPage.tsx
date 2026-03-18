import EntityManager from "./EntityManager";
import { useFetch } from "../../hooks/useFetch";
import { teamService } from "../../services/teamService";
import { teamSchema } from "../../utils/formSchemas";
import type { Team } from "../../types/Team";

export default function AdminTeamsPage() {
  const { data: teams, loading, error, setData } = useFetch(teamService.getAll, []);

  return (
    <EntityManager<Team>
      title="Správa týmů"
      description="Udržujte seznam klubových kategorií a týmových sekcí."
      rows={teams}
      loading={loading}
      error={error}
      columns={[
        { key: "name", label: "Název" },
        { key: "category", label: "Kategorie" }
      ]}
      schema={teamSchema}
      fields={[
        { name: "name", label: "Název týmu" },
        { name: "category", label: "Kategorie" }
      ]}
      emptyValues={{
        name: "",
        category: "",
        createdAt: ""
      }}
      transformSubmit={(values) => ({
        name: values.name,
        category: values.category,
        createdAt: values.createdAt
      })}
      onCreate={async (values) => {
        const created = await teamService.create({ name: values.name, category: values.category });
        setData((prev) => (prev ? [...prev, created] : [created]));
      }}
      onUpdate={async (id, values) => {
        const updated = await teamService.update(id, { name: values.name, category: values.category });
        setData((prev) => prev?.map((row) => (row.id === id ? { ...row, ...updated } : row)) ?? []);
      }}
      onDelete={async (row) => {
        await teamService.remove(row.id);
        setData((prev) => prev?.filter((item) => item.id !== row.id) ?? []);
      }}
    />
  );
}
