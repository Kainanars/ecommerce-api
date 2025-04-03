import { ProductDTO } from './ProductDTO';

export interface UpdateProductDTO {
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
export interface UpdateProductResponse {
  success: boolean;
  message: string;
  product?: ProductDTO;
}
export interface UpdateProductError {
  success: false;
  message: string;
  error: string;
}
