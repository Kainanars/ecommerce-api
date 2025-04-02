import { Product } from '@/domain/entities/Product';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  findWithFilters(
    filters: any,
    sort?: string,
    page?: number,
    limit?: number
  ): Promise<{ data: Product[]; total: number }>;
}
