export async function fetchPublicProducts(params?: {
  categoryId?: number | null;
  tags?: string[];
  sort?: string;
}) {
  const baseUrl =
    "https://portfolio-produtos-feltec.onrender.com/api/Products/public";
  const url = new URL(baseUrl);

  if (params?.categoryId)
    url.searchParams.append("categoryId", String(params.categoryId));
  if (params?.tags?.length)
    url.searchParams.append("tags", params.tags.join(","));
  if (params?.sort) url.searchParams.append("sort", params.sort);

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar produtos");
  const data = await res.json();

  const items = data.items?.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    stock: p.stock,
    image: p.imageUrl || p.image || "/placeholder.png",
    category: p.categoryName || p.category?.name || "Sem categoria",
    tags: Array.isArray(p.tags)
      ? p.tags.map((t: any) => (typeof t === "object" ? t.name : String(t)))
      : p.tagsJson
        ? JSON.parse(p.tagsJson)
        : [],
    inStock: p.stock > 0,
  }));

  return { ...data, items };
}
