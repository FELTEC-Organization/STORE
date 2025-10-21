import { Product } from "@/data/products";

export type FilterOptions = {
  search: string;
  categories: number[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  sortBy: "name-asc" | "name-desc" | "price-asc" | "price-desc";
};

export function filterProducts(
  products: Product[],
  filters: FilterOptions,
): Product[] {
  let filtered = [...products];

  // Busca por nome e descrição
  if (filters.search.trim()) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(s)),
    );
  }

  // Filtro por categorias
  if (filters.categories.length > 0) {
    filtered = filtered.filter((p) => {
      const id = typeof p.category === "object" ? p.category?.id : p.categoryId;
      return id ? filters.categories.includes(id) : false;
    });
  }

  // Filtro por faixa de preço
  filtered = filtered.filter(
    (p) =>
      (p.price ?? 0) >= filters.minPrice && (p.price ?? 0) <= filters.maxPrice,
  );

  // Filtro por disponibilidade
  if (filters.onlyInStock)
    filtered = filtered.filter((p) => (p.stock ?? 0) > 0);

  // Ordenação
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name, "pt-BR");
      case "name-desc":
        return b.name.localeCompare(a.name, "pt-BR");
      case "price-asc":
        return (a.price ?? 0) - (b.price ?? 0);
      case "price-desc":
        return (b.price ?? 0) - (a.price ?? 0);
      default:
        return 0;
    }
  });

  return filtered;
}

export function formatPrice(price?: number | null): string {
  return (price ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getWhatsAppUrl(
  product: Product,
  whatsappNumber: string,
): string {
  const message = `Olá! Tenho interesse no produto: ${product.name} - ${formatPrice(product.price)}`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
