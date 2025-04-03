import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { ProductDTO } from '@/interfaces/dtos/ProductDTO';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<ProductDTO | null> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      return null;
    }

    const productDTO: ProductDTO = {
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
    };

    return productDTO;
  }
}
