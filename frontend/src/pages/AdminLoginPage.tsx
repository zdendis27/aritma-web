import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/formSchemas";
import type { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

type LoginValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-aritma-grid px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Admin</p>
          <h1 className="text-3xl font-bold text-slate-900">Přihlášení do administrace</h1>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit(async (values) => {
            await login(values.email, values.password);
            navigate("/admin");
          })}
        >
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              {...register("email")}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none"
            />
            <span className="text-xs text-rose-600">{errors.email?.message}</span>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Heslo</span>
            <input
              type="password"
              {...register("password")}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none"
            />
            <span className="text-xs text-rose-600">{errors.password?.message}</span>
          </label>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Přihlašuji..." : "Přihlásit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
