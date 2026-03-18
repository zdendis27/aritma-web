import { Link } from "react-router-dom";

const quickLinks = [
  { to: "/kalendar", label: "Kalendář zápasů" },
  { to: "/galerie", label: "Fotogalerie" },
  { to: "/novinky", label: "Aktuality" }
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">SK Aritma Praha</p>
          <p className="max-w-sm text-sm leading-7 text-white/80">
            Moderní klubový web pro fanoušky, rodiče, hráče i vedení klubu.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Rychlé odkazy</h3>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-white/80 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Kontakt</h3>
          <p className="text-sm text-white/80">SK Aritma Praha, Nad Lavi 5, Praha 6</p>
          <p className="text-sm text-white/80">info@aritma.cz</p>
          <p className="text-sm text-white/80">+420 222 123 456</p>
        </div>
      </div>
    </footer>
  );
}
