import { Product } from '@/data/products';

export type FilterOptions = {
  search: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  sortBy: 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
};

export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  let filtered = [...products];

  // Busca por nome e descrição
  if (filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Filtro por categorias
  if (filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      filters.categories.includes(product.category)
    );
  }

  // Filtro por faixa de preço
  filtered = filtered.filter(product =>
    product.price >= filters.minPrice &&
    product.price <= filters.maxPrice
  );

  // Filtro por disponibilidade
  if (filters.onlyInStock) {
    filtered = filtered.filter(product => product.inStock);
  }

  // Ordenação
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name, 'pt-BR');
      case 'name-desc':
        return b.name.localeCompare(a.name, 'pt-BR');
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return filtered;
}

export function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 1000 };

  const prices = products.map(p => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices))
  };
}

export function getWhatsAppUrl(product: Product, whatsappNumber: string): string {
  const message = `Olá! Tenho interesse no produto: ${product.name} - ${formatPrice(product.price)}`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}