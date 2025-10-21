export type Label = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string | null;
  price?: number;
  stock?: number;
  categoryId: number;
  labels?: Label[]; 
  tags?: string[];  
};
