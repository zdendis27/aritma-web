import { useState } from "react";
import type { ReactNode } from "react";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import AdminTable from "../../components/AdminTable";
import AdminForm from "../../components/AdminForm";
import EmptyState from "../../components/EmptyState";

type EntityManagerProps<T extends { id: string }> = {
  title: string;
  description: string;
  rows: T[] | null;
  loading: boolean;
  error: string | null;
  columns: { key: keyof T | string; label: string; render?: (row: T) => ReactNode }[];
  schema: any;
  fields: {
    name: string;
    label: string;
    type?: "text" | "number" | "textarea" | "datetime-local" | "select";
    placeholder?: string;
    options?: { label: string; value: string }[];
  }[];
  emptyValues: Omit<T, "id">;
  transformSubmit?: (values: Omit<T, "id">) => Omit<T, "id">;
  mapSelectedToFormValues?: (row: T) => Omit<T, "id">;
  onCreate: (values: Omit<T, "id">) => Promise<void>;
  onUpdate: (id: string, values: Omit<T, "id">) => Promise<void>;
  onDelete: (row: T) => Promise<void>;
};

export default function EntityManager<T extends { id: string }>({
  title,
  description,
  rows,
  loading,
  error,
  columns,
  schema,
  fields,
  emptyValues,
  transformSubmit,
  mapSelectedToFormValues,
  onCreate,
  onUpdate,
  onDelete
}: EntityManagerProps<T>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);

  const defaultValues = selected
    ? mapSelectedToFormValues
      ? mapSelectedToFormValues(selected)
      : (({ id, ...rest }) => rest as Omit<T, "id">)(selected as T & Omit<T, "id">)
    : emptyValues;

  async function handleSubmit(values: Omit<T, "id">) {
    const payload = transformSubmit ? transformSubmit(values) : values;
    if (selected) {
      await onUpdate(selected.id, payload);
    } else {
      await onCreate(payload);
    }
    setOpen(false);
    setSelected(null);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle eyebrow="Správa" title={title} description={description} />
        <Button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          Přidat položku
        </Button>
      </div>

      {loading ? <EmptyState message="Načítám obsah..." /> : null}
      {error ? <EmptyState message={error} /> : null}
      {rows?.length ? (
        <AdminTable
          columns={columns}
          rows={rows}
          onEdit={(row) => {
            setSelected(row);
            setOpen(true);
          }}
          onDelete={onDelete}
        />
      ) : null}
      {!loading && !error && !rows?.length ? <EmptyState message="Zatím tu nejsou žádné záznamy." /> : null}

      <Modal open={open} title={selected ? "Upravit položku" : "Nová položka"} onClose={() => setOpen(false)}>
        <AdminForm schema={schema} fields={fields} defaultValues={defaultValues} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
