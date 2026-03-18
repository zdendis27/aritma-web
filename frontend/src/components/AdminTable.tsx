import type { ReactNode } from "react";
import Button from "./Button";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
};

type AdminTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function AdminTable<T extends { id: string }>({ columns, rows, onEdit, onDelete }: AdminTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-3 text-left text-xs font-semibold uppercase leading-[1.4] tracking-[0.14em] text-slate-500">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase leading-[1.4] tracking-[0.14em] text-slate-500">Akce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-4 text-sm text-slate-700">
                    {column.render ? column.render(row) : String(row[column.key as keyof T] ?? "")}
                  </td>
                ))}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap justify-end gap-2">
                    {onEdit ? <Button variant="ghost" onClick={() => onEdit(row)}>Upravit</Button> : null}
                    {onDelete ? <Button variant="danger" onClick={() => onDelete(row)}>Smazat</Button> : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
