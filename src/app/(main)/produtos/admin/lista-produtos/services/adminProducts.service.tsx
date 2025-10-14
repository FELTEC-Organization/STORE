export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
};

export type PaginatedProducts = {
  items: Product[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

/**
 * Mock de produtos
 * Retorna uma lista simulada de produtos com delay para simular requisição real
 */
export async function fetchProducts(params?: {
  currentPage?: number;
  pageSize?: number;
  value?: string;
}): Promise<PaginatedProducts> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://portfolio-produtos-feltec.onrender.com/api/Products/public";
  const token = localStorage.getItem("@NPG-auth-token");

  const url = new URL(baseUrl);
  url.searchParams.append("page", String(params?.currentPage || 1));
  url.searchParams.append("pageSize", String(params?.pageSize || 10));

  if (params?.value) url.searchParams.append("name", params.value);

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar produtos");

  const data = await res.json();

  return {
    items: data.items.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      stock: p.stock,
      category: p.category?.name || "-",
      imageUrl: p.imageUrl,
    })),
    currentPage: data.page,
    pageSize: data.pageSize,
    totalItems: data.totalItems,
    totalPages: Math.ceil(data.totalItems / data.pageSize),
    hasPreviousPage: data.page > 1,
    hasNextPage: data.page < Math.ceil(data.totalItems / data.pageSize),
  };
}
