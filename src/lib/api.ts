// src/lib/api.ts  (substitua seu fetchProducts por este)
export async function fetchProducts(
  page = 1,
  pageSize = 12,
  filters: {
    search?: string;
    categoryIds?: number[];
    tags?: string[];
    // seu front usa "sortBy" mas aqui consideramos ambos: sort e sortBy
    sort?: "name-asc" | "name-desc" | "price-asc" | "price-desc";
    sortBy?: "name-asc" | "name-desc" | "price-asc" | "price-desc";
    onlyInStock?: boolean;
  } = {},
) {
  const BASE_URL = "https://portfolio-produtos-feltec.onrender.com";

  // 1) buscar tags
  const tagsRes = await fetch(`${BASE_URL}/api/ProductLabels`);
  if (!tagsRes.ok) throw new Error("Erro ao buscar tags");
  const tagsList = await tagsRes.json();
  const tagMap = new Map(tagsList.map((t: any) => [t.id, t.name]));

  // 2) buscar categorias (mapa id->nome)
  const categoriesRes = await fetch(`${BASE_URL}/api/Categories/public`);
  if (!categoriesRes.ok) throw new Error("Erro ao buscar categorias");
  const categoriesList = await categoriesRes.json();
  const categoryMap = new Map(categoriesList.map((c: any) => [c.id, c.name]));

  // 3) decidir qual campo de sort usar (aceita sort ou sortBy vindo do front)
  const effectiveSort = (filters.sort ?? (filters as any).sortBy) as
    | "name-asc"
    | "name-desc"
    | "price-asc"
    | "price-desc"
    | undefined;

  // 4) map para o formato que o backend espera (backend usa underscore: name_asc, etc.)
  const sortMap: Record<string, string> = {
    "name-asc": "name_asc",
    "name-desc": "name_desc",
    "price-asc": "price_asc",
    "price-desc": "price_desc",
  };

  // função para buscar produtos (por categoria opcional)
  const fetchByCategory = async (categoryId?: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    if (filters.search) params.set("name", filters.search);
    if (categoryId !== undefined && categoryId !== null)
      params.set("categoryId", String(categoryId));
    if (filters.tags?.length) params.set("tags", filters.tags.join(","));
    if (effectiveSort)
      params.set("sort", sortMap[effectiveSort] || effectiveSort);

    const res = await fetch(
      `${BASE_URL}/api/Products/public?${params.toString()}`,
    );
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    return res.json();
  };

  // 5) buscar produtos (suporta múltiplas categorias)
  let allProducts: any[] = [];
  if (filters.categoryIds?.length) {
    // se backend aceita múltiplos IDs em categoryId separando por vírgula (você já ajustou o controller),
    // fazemos uma única request com categoryId=1,2
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    if (filters.search) params.set("name", filters.search);
    params.set("categoryId", filters.categoryIds.join(","));
    if (filters.tags?.length) params.set("tags", filters.tags.join(","));
    if (effectiveSort)
      params.set("sort", sortMap[effectiveSort] || effectiveSort);

    const res = await fetch(
      `${BASE_URL}/api/Products/public?${params.toString()}`,
    );
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    const result = await res.json();
    allProducts = result.items || [];
  } else {
    const result = await fetchByCategory();
    allProducts = result.items || [];
  }

  // 6) filtrar apenas em estoque, caso pedido
  if (filters.onlyInStock) {
    allProducts = allProducts.filter((p) => (p.stock ?? 0) > 0);
  }

  // 7) ordenação local (fallback) - NOME case-insensitive
  if (effectiveSort) {
    switch (effectiveSort) {
      case "name-asc":
        allProducts.sort((a, b) =>
          String(a.name ?? "").localeCompare(String(b.name ?? ""), undefined, {
            sensitivity: "base",
          }),
        );
        break;
      case "name-desc":
        allProducts.sort((a, b) =>
          String(b.name ?? "").localeCompare(String(a.name ?? ""), undefined, {
            sensitivity: "base",
          }),
        );
        break;
      case "price-asc":
        allProducts.sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
        break;
      case "price-desc":
        allProducts.sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
        break;
    }
  }

  // 8) mapear imagens / tags / categoryName
  const items = allProducts.map((p: any) => {
    let imageUrl = p.image || p.imageUrl || "";
    if (
      imageUrl &&
      !imageUrl.startsWith("http") &&
      !imageUrl.startsWith("data:image")
    ) {
      imageUrl = `data:image/jpeg;base64,${imageUrl}`;
    }
    if (!imageUrl) imageUrl = "/placeholder.png";

    return {
      ...p,
      image: imageUrl,
      tags: Array.isArray(p.tags)
        ? p.tags.map((t: any) =>
            typeof t === "object"
              ? t.name
              : tagMap.get(Number(t)) || `Tag #${t}`,
          )
        : [],
      categoryName:
        categoryMap.get(p.categoryId) || `Categoria #${p.categoryId}`,
    };
  });

  return {
    items,
    totalItems: items.length,
    page,
    pageSize,
  };
}
