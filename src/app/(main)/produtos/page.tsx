"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductsToolbar } from "@/components/ProductsToolbar";
import { Pagination } from "@/components/Pagination";
import { Footer } from "@/components/Footer";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import {
  filterProducts,
  getPriceRange,
  type FilterOptions,
} from "@/lib/filters";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const priceRange = useMemo(() => getPriceRange(PRODUCTS), []);

  // State from URL params
  const [filters, setFilters] = useState<FilterOptions>({
    search: searchParams.get("q") || "",
    categories: searchParams.get("categoria")
      ? searchParams.get("categoria")!.split(",")
      : [],
    minPrice: parseInt(searchParams.get("min") || String(priceRange.min)),
    maxPrice: parseInt(searchParams.get("max") || String(priceRange.max)),
    onlyInStock: searchParams.get("disponivel") === "true",
    sortBy:
      (searchParams.get("ordem") as FilterOptions["sortBy"]) || "name-asc",
  });

  const currentPage = parseInt(searchParams.get("pagina") || "1");

  // Update URL when filters change
  const updateUrlParams = (newFilters: FilterOptions, page: number) => {
    const params = new URLSearchParams();

    if (newFilters.search) params.set("q", newFilters.search);
    if (newFilters.categories.length)
      params.set("categoria", newFilters.categories.join(","));
    if (newFilters.minPrice !== priceRange.min)
      params.set("min", String(newFilters.minPrice));
    if (newFilters.maxPrice !== priceRange.max)
      params.set("max", String(newFilters.maxPrice));
    if (newFilters.onlyInStock) params.set("disponivel", "true");
    if (newFilters.sortBy !== "name-asc")
      params.set("ordem", newFilters.sortBy);
    if (page > 1) params.set("pagina", String(page));

    router.push(`/produtos?${params.toString()}`, { scroll: false });
  };

  // Filter and paginate products
  useEffect(() => {
    updateUrlParams(filters, currentPage);
  }, [filters, currentPage]);

  const filteredProducts = useMemo(
    () => filterProducts(PRODUCTS, filters),
    [filters],
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    updateUrlParams(filters, page);
  };

  const removeFilter = (type: string, value?: string) => {
    setFilters((prev) => {
      switch (type) {
        case "search":
          return { ...prev, search: "" };
        case "category":
          return {
            ...prev,
            categories: prev.categories.filter((c) => c !== value),
          };
        case "price":
          return {
            ...prev,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
          };
        case "stock":
          return { ...prev, onlyInStock: false };
        default:
          return prev;
      }
    });
  };

  const activeFilters = [
    ...(filters.search
      ? [
          {
            type: "search",
            label: `Busca: "${filters.search}"`,
            value: filters.search,
          },
        ]
      : []),
    ...filters.categories.map((cat) => ({
      type: "category",
      label: cat,
      value: cat,
    })),
    ...(filters.minPrice !== priceRange.min ||
    filters.maxPrice !== priceRange.max
      ? [
          {
            type: "price",
            label: `R$ ${filters.minPrice} - R$ ${filters.maxPrice}`,
            value: "price",
          },
        ]
      : []),
    ...(filters.onlyInStock
      ? [{ type: "stock", label: "Apenas disponíveis", value: "stock" }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Page Header */}
        <section className="relative py-10 bg-gradient-subtle border-b border-border/50 overflow-hidden">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-foreground mb-4 leading-tight drop-shadow-sm">
                Nossos Produtos
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Encontre a peça perfeita para seu espaço e transforme seu
                ambiente com estilo e qualidade
              </p>
            </motion.div>

            {/* Background subtle detail */}
            <div className="absolute -top-10 -left-20 w-96 h-96 border-2 rounded-full border-border/30 border-sunset/20 dark:border-border/60 pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 border-2 rounded-full border-border/30 border-sunset/20 dark:border-border/60 pointer-events-none" />
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <ProductsToolbar
              filters={filters}
              onFiltersChange={setFilters}
              categories={CATEGORIES}
              priceRange={priceRange}
              activeFilters={activeFilters}
              onRemoveFilter={removeFilter}
              totalResults={filteredProducts.length}
            />

            {/* Products Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-lg text-muted-foreground mb-4">
                  Nenhum produto encontrado com os filtros aplicados
                </p>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar os filtros ou remover algumas restrições
                </p>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
