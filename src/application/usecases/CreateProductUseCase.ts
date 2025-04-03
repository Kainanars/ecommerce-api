import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import {
  CreateProductDTO,
  CreateProductResponse,
  CreateProductError,
} from '@/interfaces/dtos/CreateProductDTO';

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
        true,
        productData.discount,
        productData.tags,
        productData.brand
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
