import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

const items = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/zapasy", label: "Zápasy" },
  { to: "/admin/tymy", label: "Týmy" },
  { to: "/admin/hraci", label: "Hráči" },
  { to: "/admin/novinky", label: "Novinky" },
  { to: "/admin/galerie", label: "Galerie" }
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen bg-slate-100 lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-slate-200 bg-primary px-6 py-8 text-white">
        <div className="space-y-2">
          <p className="text-sm uppercase leading-[1.45] tracking-[0.2em] text-white/60">Admin panel</p>
          <h1 className="text-2xl font-bold">SK Aritma Praha</h1>
          <p className="text-sm text-white/70">{user?.email}</p>
        </div>

        <nav className="mt-10 flex flex-col gap-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm font-semibold leading-[1.3] transition ${isActive ? "bg-white text-primary" : "text-white/80 hover:bg-white/10 hover:text-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button
          variant="secondary"
          className="mt-10 w-full"
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
        >
          Odhlásit
        </Button>
      </aside>

      <main className="p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
