"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductsToolbar } from "@/components/ProductsToolbar";
import Pagination from "@/components/Pagination";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filtros atuais
  const [filters, setFilters] = useState({
    search: searchParams.get("q") ?? "",
    categoryIds: searchParams.get("categoria")
      ? [Number(searchParams.get("categoria"))]
      : [],
    sortBy:
      (searchParams.get("ordem") as
        | "name-asc"
        | "name-desc"
        | "price-asc"
        | "price-desc") ?? "name-asc",
    onlyInStock: false,
  });

  const currentPage = parseInt(searchParams.get("pagina") || "1");

  // Atualiza a URL quando filtros mudam
  const updateUrlParams = (page: number, updatedFilters = filters) => {
    const params = new URLSearchParams();

    if (updatedFilters.search) params.set("q", updatedFilters.search);
    if (updatedFilters.categoryIds?.length)
      params.set("categoria", updatedFilters.categoryIds.join(","));
    if (updatedFilters.sortBy !== "name-asc")
      params.set("ordem", updatedFilters.sortBy);
    if (updatedFilters.onlyInStock) params.set("estoque", "true");
    if (page > 1) params.set("pagina", String(page));

    router.push(`/produtos?${params.toString()}`, { scroll: false });
  };

  // Busca os produtos da API
  useEffect(() => {
    setLoading(true);
    fetchProducts(currentPage, ITEMS_PER_PAGE, filters)
      .then((res) => {
        setProducts(res.items);
        setTotal(res.totalItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentPage, filters]);

  const handlePageChange = (page: number) => updateUrlParams(page);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    updateUrlParams(1, newFilters);
  };

  const handleRemoveFilter = (type: string, value?: string) => {
    const newFilters = { ...filters };
    if (type === "search") newFilters.search = "";
    if (type === "category") {
      newFilters.categoryIds = newFilters.categoryIds?.filter(
        (id) => String(id) !== value,
      );
    }
    if (type === "onlyInStock") newFilters.onlyInStock = false;
    setFilters(newFilters);
    updateUrlParams(1, newFilters);
  };

  const activeFilters = [
    ...(filters.search
      ? [
          {
            type: "search",
            label: `Busca: ${filters.search}`,
            value: filters.search,
          },
        ]
      : []),
    ...(filters.categoryIds?.length
      ? filters.categoryIds.map((id) => ({
          type: "category",
          label: `Categoria #${id}`,
          value: String(id),
        }))
      : []),
    ...(filters.onlyInStock
      ? [{ type: "onlyInStock", label: "Em estoque", value: "true" }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative py-10 bg-gradient-subtle border-b border-border/50 overflow-hidden text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-foreground mb-4">
              Nossos Produtos
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Encontre a peça perfeita para seu espaço e transforme seu ambiente
              com estilo e qualidade
            </p>
          </motion.div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <ProductsToolbar
              filters={filters}
              onFiltersChange={handleFiltersChange as any}
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
              totalResults={total}
            />

            {loading ? (
              <div className="text-center py-16 text-muted-foreground">
                Carregando produtos...
              </div>
            ) : products.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-lg text-muted-foreground mb-4">
                  Nenhum produto encontrado
                </p>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar os filtros ou remover algumas restrições
                </p>
              </motion.div>
            )}

            {total > ITEMS_PER_PAGE && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalItems={total}
                  pageSize={ITEMS_PER_PAGE}
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
