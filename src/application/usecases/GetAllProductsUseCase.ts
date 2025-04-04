import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { ProductDTO } from '@/interfaces/dtos/ProductDTO';

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<ProductDTO[]> {
    const products = await this.productRepository.findAll();

    return products.map((product) => ({
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
  }
}
