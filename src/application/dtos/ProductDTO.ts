export interface ProductDTO {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  stock?: number;
  images?: string[];
  discount?: number;
  tags?: string[];
  brand?: string;
  isActive?: boolean;
}
