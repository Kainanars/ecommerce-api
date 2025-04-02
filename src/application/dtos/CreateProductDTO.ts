export interface CreateProductDTO {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
  discount?: number;
  tags?: string[];
  brand?: string;
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  product?: CreateProductDTO;
}

export interface CreateProductError {
  success: false;
  message: string;
  error: string;
}
