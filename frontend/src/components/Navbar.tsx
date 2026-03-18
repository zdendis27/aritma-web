import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import emblem from "../assets/524902522_1155167866655127_7419341489111267772_n.jpg";
import TransparentLogo from "./TransparentLogo";

const navItems = [
  { to: "/", label: "Domů" },
  { to: "/zapasy", label: "Zápasy" },
  { to: "/tymy", label: "Týmy" },
  { to: "/novinky", label: "Novinky" },
  { to: "/klub", label: "Klub" },
  { to: "/admin", label: "Admin" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center">
          <TransparentLogo
            src={emblem}
            alt="SK Aritma Praha"
            className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_14px_22px_rgba(59,63,156,0.2)] md:h-20 md:w-20"
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2.5 text-sm font-extrabold leading-[1.2] tracking-[0.02em] transition",
                  isActive
                    ? "bg-primary text-white shadow-glow"
                    : "text-slate-700 hover:-translate-y-0.5 hover:bg-primary/8 hover:text-primary"
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Zavřít navigaci" : "Otevřít navigaci"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-sm transition hover:bg-primary/5 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={[
                "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition",
                isOpen ? "translate-y-[7px] rotate-45" : ""
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition",
                isOpen ? "opacity-0" : ""
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition",
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      <div
        className={[
          "overflow-hidden border-t border-primary/10 bg-white/95 transition-all duration-300 md:hidden",
          isOpen ? "max-h-96 py-3" : "max-h-0 py-0"
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 md:px-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                [
                  "rounded-2xl px-4 py-3 text-sm font-extrabold leading-[1.2] tracking-[0.02em] transition",
                  isActive ? "bg-primary text-white" : "text-slate-700 hover:bg-primary/8 hover:text-primary"
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
