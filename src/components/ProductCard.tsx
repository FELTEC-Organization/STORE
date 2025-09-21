"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Product } from '@/data/products';
import { formatPrice, getWhatsAppUrl } from '@/lib/filters';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(product, siteConfig.contact.whatsapp);
    window.open(url, '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group bg-card border border-border/50 rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={product.inStock ? 'secondary' : 'destructive'} className="text-xs">
            {product.inStock ? 'Em estoque' : 'Esgotado'}
          </Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Price */}
        <div className="text-2xl font-bold text-primary mb-4">
          {formatPrice(product.price)}
        </div>

        {/* WhatsApp Button */}
        <Button
          onClick={handleWhatsApp}
          disabled={!product.inStock}
          className="w-full"
          variant={product.inStock ? 'default' : 'secondary'}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {product.inStock ? 'Chamar no WhatsApp' : 'Produto Esgotado'}
        </Button>
      </div>
    </motion.div>
  );
}