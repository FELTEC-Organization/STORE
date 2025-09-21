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
  const allProducts: Product[] = [
    { id: 1, name: "Camiseta Básica", price: 49.9, stock: 120, category: "Roupas" },
    { id: 2, name: "Tênis Esportivo", price: 199.9, stock: 50, category: "Calçados" },
    { id: 3, name: "Mochila Escolar", price: 89.9, stock: 200, category: "Acessórios" },
    { id: 4, name: "Relógio Digital", price: 299.9, stock: 15, category: "Acessórios" },
    { id: 5, name: "Jaqueta Jeans", price: 149.9, stock: 40, category: "Roupas" },
  ];

  const pageSize = params?.pageSize || 10;
  const currentPage = params?.currentPage || 1;
  const filterValue = params?.value?.toLowerCase() || "";

  // Filtrando produtos pelo valor
  const filtered = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(filterValue) ||
      p.category.toLowerCase().includes(filterValue)
  );

  // Paginação
  const start = (currentPage - 1) * pageSize;
  const pagedItems = filtered.slice(start, start + pageSize);
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: pagedItems,
        currentPage,
        pageSize,
        totalItems,
        totalPages,
        hasPreviousPage: currentPage > 1,
        hasNextPage: currentPage < totalPages,
      });
    }, 500); // delay simulado
  });
}
