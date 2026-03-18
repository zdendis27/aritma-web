import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import MatchCard from "../components/MatchCard";
import ArticleCard from "../components/ArticleCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { matchService } from "../services/matchService";
import { articleService } from "../services/articleService";
import { useFetch } from "../hooks/useFetch";
import { isUpcoming } from "../utils/formatters";

export default function HomePage() {
  const { data: matches } = useFetch(matchService.getAll, []);
  const { data: articles } = useFetch(articleService.getAll, []);

  const latestMatches = (matches ?? []).slice(0, 3);
  const latestArticles = (articles ?? []).slice(0, 3);

  return (
    <div className="space-y-16">
      <Hero />

      <section className="grid gap-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:grid-cols-4">
        {[
          { title: "A tým", text: "Profesionalita, soustředěnost, kvalita." },
          { title: "Mládež", text: "U naší mládež se soustředíme hlavně na budoucnost hráčů" },
          { title: "Zázemí", text: "Naši hráči mají k dispozici kvalitní zázemí v Pražských vokovicích" },
          { title: "Tradice", text: "Aritma je tu s námi už 107 let" }
        ].map((item) => (
          <div key={item.title} className="space-y-2 rounded-[1.25rem] bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="text-sm leading-7 text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Zápasový servis"
          title="Poslední a nejbližší zápasy"
          description="Přehled výsledků a programu klubu na jednom místě."
        />
        {latestMatches.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {latestMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <EmptyState message="Zatím nejsou k dispozici žádné zápasy." />
        )}
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <SectionTitle
            eyebrow="Aktuality"
            title="Poslední novinky z klubu"
            description="Shrnutí důležitých událostí pro fanoušky, rodiče i hráče."
          />
          {latestArticles.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <EmptyState message="Aktuálně nejsou publikovány žádné články." />
          )}
        </div>

        <aside className="rounded-[2rem] bg-primary p-8 text-white shadow-glow">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/65">Klub v kostce</p>
          <h3 className="mt-4 text-3xl font-bold">Tradice a výchova mládeže</h3>
          <p className="mt-4 text-sm leading-7 text-white/80">
            Aritma staví na spojení komunitního života, kvalitního tréninkového procesu a dlouhodobé klubové identity.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/klub">
              <Button variant="heroPrimary" className="w-full">
                O klubu
              </Button>
            </Link>
            <Link to={latestMatches.find((item) => isUpcoming(item.date)) ? "/kalendar" : "/zapasy"}>
              <Button variant="heroSecondary" className="w-full">
                Kalendář zápasů
              </Button>
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
