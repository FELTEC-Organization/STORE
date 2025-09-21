"use client";
import { useState, useCallback } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FilterOptions, debounce } from '@/lib/filters';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductsToolbarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: readonly string[];
  priceRange: { min: number; max: number };
  activeFilters: Array<{ type: string; label: string; value: string }>;
  onRemoveFilter: (type: string, value?: string) => void;
  totalResults: number;
}

export function ProductsToolbar({
  filters,
  onFiltersChange,
  categories,
  priceRange,
  activeFilters,
  onRemoveFilter,
  totalResults
}: ProductsToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      onFiltersChange({ ...filters, search });
    }, 300),
    [filters, onFiltersChange]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (field: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    onFiltersChange({
      ...filters,
      [field === 'min' ? 'minPrice' : 'maxPrice']: numValue
    });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleStockToggle = (checked: boolean) => {
    onFiltersChange({ ...filters, onlyInStock: checked });
  };

  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
            <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
            <SelectItem value="price-asc">Menor preço</SelectItem>
            <SelectItem value="price-desc">Maior preço</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Advanced Filters */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-muted/30 rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category, checked as boolean)
                        }
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-3">Faixa de Preço</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                      Preço mínimo
                    </Label>
                    <Input
                      id="min-price"
                      type="number"
                      placeholder={String(priceRange.min)}
                      value={filters.minPrice}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      min={priceRange.min}
                      max={priceRange.max}
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                      Preço máximo
                    </Label>
                    <Input
                      id="max-price"
                      type="number"
                      placeholder={String(priceRange.max)}
                      value={filters.maxPrice}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      min={priceRange.min}
                      max={priceRange.max}
                    />
                  </div>
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-3">Disponibilidade</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="stock-filter"
                    checked={filters.onlyInStock}
                    onCheckedChange={handleStockToggle}
                  />
                  <Label htmlFor="stock-filter" className="text-sm">
                    Apenas produtos disponíveis
                  </Label>
                </div>
              </div>
            </div>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters & Results Count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">
            {totalResults} {totalResults === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </span>
          
          <AnimatePresence>
            {activeFilters.map((filter) => (
              <motion.div
                key={`${filter.type}-${filter.value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary" className="gap-1">
                  {filter.label}
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
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}