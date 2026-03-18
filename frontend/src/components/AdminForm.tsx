import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodTypeAny } from "zod";
import Button from "./Button";

type Option = { label: string; value: string };

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "datetime-local" | "select";
  placeholder?: string;
  options?: Option[];
};

type AdminFormProps<T extends Record<string, unknown>> = {
  schema: ZodTypeAny;
  fields: FieldConfig[];
  defaultValues: T;
  onSubmit: (values: T) => Promise<void>;
};

export default function AdminForm<T extends Record<string, unknown>>({
  schema,
  fields,
  defaultValues,
  onSubmit
}: AdminFormProps<T>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit((values) => onSubmit(values))}>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="space-y-2 text-sm font-medium leading-[1.45] text-slate-700">
            <span>{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                {...register(field.name as never)}
                rows={5}
                placeholder={field.placeholder}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 transition focus:border-primary"
              />
            ) : field.type === "select" ? (
              <select
                {...register(field.name as never)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
              >
                <option value="">Vyberte</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...register(field.name as never, field.type === "number" ? { valueAsNumber: true } : undefined)}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
              />
            )}
            <span className="block min-h-8 text-xs leading-[1.45] text-rose-600">
              {String(errors[field.name as keyof T]?.message ?? "")}
            </span>
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ukládám..." : "Uložit"}
        </Button>
      </div>
    </form>
  );
}
