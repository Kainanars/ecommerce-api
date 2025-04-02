import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import {
  CreateProductDTO,
  CreateProductResponse,
  CreateProductError,
} from '@/application/dtos/CreateProductDTO';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    productData: CreateProductDTO
  ): Promise<CreateProductResponse | CreateProductError> {
    try {
      const product = new Product(
        '',
        productData.name,
        productData.price,
        productData.description,
        productData.category,
        productData.stock,
        productData.images,
        new Date(),
        new Date(),
        true,
        productData.discount,
        productData.tags,
        productData.brand,
        { average: 0, count: 0 },
        []
      );

      const createdProduct = await this.productRepository.create(product);

      return {
        success: true,
        message: '✅ Product created successfully',
        product: {
          name: createdProduct.name,
          price: createdProduct.price,
          description: createdProduct.description,
          category: createdProduct.category,
          stock: createdProduct.stock,
          images: createdProduct.images,
          discount: createdProduct.discount,
          tags: createdProduct.tags,
          brand: createdProduct.brand,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: '❌ Failed to create product',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
