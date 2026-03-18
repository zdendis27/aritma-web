import { Link } from "react-router-dom";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] bg-primary px-6 py-16 text-white shadow-glow md:px-12 md:py-24">
      <div className="absolute inset-0 hero-sheen bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_26%),linear-gradient(135deg,rgba(46,50,127,0.12),rgba(59,63,156,0.02))]" />
      <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-white/10 blur-3xl hero-float" />
      <div className="relative grid gap-12 md:grid-cols-[1.25fr_0.75fr] md:items-end">
        <div className="space-y-7 hero-enter">
          <p className="text-sm font-semibold uppercase leading-[1.5] tracking-[0.24em] text-white/70">Oficiální klubový web</p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.08] md:text-6xl">

            <span className="block ">Klub, který propojuje výkon, komunitu a mládež.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/85">
            Sledujte výsledky, týmy, novinky a fotografie z klubového života na jednom místě.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/zapasy">
              <Button variant="heroPrimary">Aktuální zápasy</Button>
            </Link>
            <Link to="/novinky">
              <Button variant="heroSecondary">Klubové novinky</Button>
            </Link>
          </div>
        </div>

        <div className="hero-panel rounded-[1.5rem] border border-white/10 bg-primaryDark/60 p-6 backdrop-blur">
          <p className="text-sm font-semibold uppercase leading-[1.5] tracking-[0.18em] text-white/70">Další program</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-white/70">Divize A</p>
              <p className="mt-1 text-xl font-bold leading-snug">SK Aritma Praha vs Admira Praha B</p>
              <p className="mt-2 text-sm text-white/80">22. 03. 2026, 10:15 • Stadion Aritma</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-white/70">Mládež</p>
              <p className="mt-1 text-xl font-bold leading-snug">U19 vs Bohemians 1905 U19</p>
              <p className="mt-2 text-sm text-white/80">Víkendový blok a otevřený fanouškovský den</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
