import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { ProductDTO } from '@/interfaces/dtos/ProductDTO';

interface GetAllProductsByFiltersDTO {
  filters: any;
  sort?: string;
  page?: number;
  limit?: number;
}

export class GetAllProductsByFiltersUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    dto: GetAllProductsByFiltersDTO
  ): Promise<{ data: ProductDTO[]; total: number }> {
    const { filters, sort, page, limit } = dto;

    const result = await this.productRepository.findWithFilters(
      filters,
      sort,
      page,
      limit
    );

    const data = result.data.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      images: product.images,
      discount: product.discount,
      tags: product.tags,
      brand: product.brand,
      isActive: product.isActive,
    }));

    return {
      data,
      total: result.total,
    };
  }
}
