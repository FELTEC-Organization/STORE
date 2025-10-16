"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "@/lib/filters";

interface Category {
  id: number;
  name: string;
}

interface FilterOptions {
  search?: string;
  categoryIds?: number[];
  sortBy?: string;
  onlyInStock?: boolean;
}

interface ProductsToolbarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  activeFilters: Array<{ type: string; label: string; value: string }>;
  onRemoveFilter: (type: string, value?: string) => void;
  totalResults: number;
}

export function ProductsToolbar({
  filters,
  onFiltersChange,
  activeFilters,
  onRemoveFilter,
  totalResults,
}: ProductsToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
  const [localSort, setLocalSort] = useState(filters.sortBy || "name-asc");
  const [onlyInStock, setOnlyInStock] = useState(filters.onlyInStock || false);

  useEffect(() => {
    fetch(
      "https://portfolio-produtos-feltec.onrender.com/api/Categories/public",
    )
      .then((res) => res.json())
      .then((list: Category[]) => {
        setCategories(list);
        const map: Record<number, string> = {};
        list.forEach((c) => (map[c.id] = c.name));
        setCategoryMap(map);
      })
      .catch(() => console.error("Erro ao carregar categorias"));
  }, []);

  const debouncedSearch = useCallback(
    debounce((search: string) => {
      onFiltersChange({ ...filters, search });
    }, 400),
    [filters, onFiltersChange],
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const newCategories = checked
      ? [...(filters.categoryIds || []), categoryId]
      : (filters.categoryIds || []).filter((c) => c !== categoryId);

    onFiltersChange({ ...filters, categoryIds: newCategories });
  };

  const handleSortChange = (sortBy: string) => {
    setLocalSort(sortBy);
    onFiltersChange({ ...filters, sortBy });
  };

  const handleStockToggle = (checked: boolean) => {
    setOnlyInStock(checked);
    onFiltersChange({ ...filters, onlyInStock: checked });
  };

  return (
    <div className="space-y-6">
      {/* Search, Sort e botão de filtro */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={localSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Nome (A–Z)</SelectItem>
            <SelectItem value="name-desc">Nome (Z–A)</SelectItem>
            <SelectItem value="price-asc">Menor preço</SelectItem>
            <SelectItem value="price-desc">Maior preço</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 !hover:white"
        >
          <Filter className="h-4 w-4" />
          Filtros
          <ChevronDown
            className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-muted/30 rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-sm mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${cat.id}`}
                        checked={filters.categoryIds?.includes(cat.id)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(cat.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={`cat-${cat.id}`} className="text-sm">
                        {cat.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-3 mt-6">
                <Switch
                  id="stock-filter"
                  checked={onlyInStock}
                  onCheckedChange={handleStockToggle}
                />
                <Label htmlFor="stock-filter" className="text-sm">
                  Apenas produtos disponíveis
                </Label>
              </div>
            </div>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">
            {totalResults}{" "}
            {totalResults === 1 ? "produto encontrado" : "produtos encontrados"}
          </span>

          <AnimatePresence>
            {activeFilters.map((filter) => {
              let label = filter.label;
              if (filter.type === "category" && filter.value) {
                const id = Number(filter.value);
                label = categoryMap[id] || `Categoria #${id}`;
              }

              return (
                <motion.div
                  key={`${filter.type}-${filter.value}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge variant="secondary" className="gap-1">
                    {label}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveFilter(filter.type, filter.value)}
                      className="h-auto w-auto p-0.5 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
