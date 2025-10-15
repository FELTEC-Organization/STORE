export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  category: string | { id: number; name: string };
  tags: string[];
  inStock: boolean;
}
