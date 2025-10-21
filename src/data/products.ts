export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price?: number | null;
  stock?: number | null;
  categoryId: number | null;
  category?: { id: number; name: string } | null;
  image?: string | null;
  tags?: string[];
  labelIds?: number[];
  labels?: { id: number; name: string }[] | string[] | null;
};
