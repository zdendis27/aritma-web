import EntityManager from "./EntityManager";
import { useFetch } from "../../hooks/useFetch";
import { articleService } from "../../services/articleService";
import { articleSchema } from "../../utils/formSchemas";
import type { Article } from "../../types/Article";
import { formatDate } from "../../utils/formatters";

export default function AdminArticlesPage() {
  const { data: articles, loading, error, setData } = useFetch(articleService.getAll, []);

  return (
    <EntityManager<Article>
      title="Správa novinek"
      description="Publikace a úpravy klubových článků, oznámení a reportáží."
      rows={articles}
      loading={loading}
      error={error}
      columns={[
        { key: "title", label: "Nadpis" },
        { key: "author", label: "Autor" },
        { key: "createdAt", label: "Datum", render: (row) => formatDate(row.createdAt) }
      ]}
      schema={articleSchema}
      fields={[
        { name: "title", label: "Nadpis" },
        { name: "author", label: "Autor" },
        { name: "image", label: "URL obrázku" },
        { name: "content", label: "Text", type: "textarea" }
      ]}
      emptyValues={{
        title: "",
        content: "",
        image: "",
        author: "",
        createdAt: ""
      }}
      transformSubmit={(values) => ({
        ...values,
        createdAt: values.createdAt
      })}
      onCreate={async (values) => {
        const created = await articleService.create({
          title: values.title,
          content: values.content,
          image: values.image,
          author: values.author
        });
        setData((prev) => (prev ? [created, ...prev] : [created]));
      }}
      onUpdate={async (id, values) => {
        const updated = await articleService.update(id, {
          title: values.title,
          content: values.content,
          image: values.image,
          author: values.author
        });
        setData((prev) => prev?.map((row) => (row.id === id ? { ...row, ...updated } : row)) ?? []);
      }}
      onDelete={async (row) => {
        await articleService.remove(row.id);
        setData((prev) => prev?.filter((item) => item.id !== row.id) ?? []);
      }}
    />
  );
}
