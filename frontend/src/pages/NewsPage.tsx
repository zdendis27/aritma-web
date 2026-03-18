import SectionTitle from "../components/SectionTitle";
import ArticleCard from "../components/ArticleCard";
import EmptyState from "../components/EmptyState";
import { articleService } from "../services/articleService";
import { useFetch } from "../hooks/useFetch";

export default function NewsPage() {
  const { data: articles, loading, error } = useFetch(articleService.getAll, []);

  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Novinky"
        title="Aktuální články a oznámení"
        description="Klubové zpravodajství, výsledky, pozvánky a důležité informace pro celý klub."
      />
      {loading ? <EmptyState message="Načítám články..." /> : null}
      {error ? <EmptyState message={error} /> : null}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(articles ?? []).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
