import SectionTitle from "../components/SectionTitle";
import EmptyState from "../components/EmptyState";
import { galleryService } from "../services/galleryService";
import { useFetch } from "../hooks/useFetch";

export default function GalleryPage() {
  const { data: gallery, loading, error } = useFetch(galleryService.getAll, []);

  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Galerie"
        title="Fotografie z klubového života"
        description="Výběr snímků ze zápasů, tréninků a klubových akcí."
      />
      {loading ? <EmptyState message="Načítám galerii..." /> : null}
      {error ? <EmptyState message={error} /> : null}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(gallery ?? []).map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
            <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
