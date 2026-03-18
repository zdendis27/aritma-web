import EntityManager from "./EntityManager";
import { useFetch } from "../../hooks/useFetch";
import { galleryService } from "../../services/galleryService";
import { gallerySchema } from "../../utils/formSchemas";
import type { GalleryItem } from "../../types/Gallery";
import { formatDate } from "../../utils/formatters";

export default function AdminGalleryPage() {
  const { data: gallery, loading, error, setData } = useFetch(galleryService.getAll, []);

  return (
    <EntityManager<GalleryItem>
      title="Správa galerie"
      description="Přidávání, editace a mazání fotografií ze zápasů i klubových akcí."
      rows={gallery}
      loading={loading}
      error={error}
      columns={[
        { key: "title", label: "Název" },
        { key: "image", label: "Obrázek" },
        { key: "createdAt", label: "Datum", render: (row) => formatDate(row.createdAt) }
      ]}
      schema={gallerySchema}
      fields={[
        { name: "title", label: "Název" },
        { name: "image", label: "URL obrázku" }
      ]}
      emptyValues={{
        title: "",
        image: "",
        createdAt: ""
      }}
      transformSubmit={(values) => ({
        ...values,
        createdAt: values.createdAt
      })}
      onCreate={async (values) => {
        const created = await galleryService.create({ title: values.title, image: values.image });
        setData((prev) => (prev ? [created, ...prev] : [created]));
      }}
      onUpdate={async (id, values) => {
        const updated = await galleryService.update(id, { title: values.title, image: values.image });
        setData((prev) => prev?.map((row) => (row.id === id ? { ...row, ...updated } : row)) ?? []);
      }}
      onDelete={async (row) => {
        await galleryService.remove(row.id);
        setData((prev) => prev?.filter((item) => item.id !== row.id) ?? []);
      }}
    />
  );
}
