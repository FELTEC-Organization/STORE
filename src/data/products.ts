export type Product = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId: number | null;
  imageUrl?: string | null;
  tags?: string[];      
  labelIds?: number[];  
  labels?: string[];    
};
