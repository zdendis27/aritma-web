import type { Article } from "../types/Article";
import { formatDate } from "../utils/formatters";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-slate-200">
      <img src={article.image} alt={article.title} className="h-56 w-full object-cover" />
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">
            {article.author} • {formatDate(article.createdAt)}
          </p>
          <h3 className="text-2xl font-bold leading-[1.2] text-slate-900">{article.title}</h3>
        </div>
        <p className="text-sm leading-7 text-slate-600">{article.content}</p>
      </div>
    </article>
  );
}
