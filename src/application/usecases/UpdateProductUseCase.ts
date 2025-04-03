import { IProductRepository } from '@/domain/repositories/IProductRepository';
import {
  UpdateProductDTO,
  UpdateProductResponse,
  UpdateProductError,
} from '@/interfaces/dtos/UpdateProductDTO';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    updateProductDTO: UpdateProductDTO
  ): Promise<UpdateProductResponse | UpdateProductError> {
    try {
      const updatedProduct = await this.productRepository.update(
        updateProductDTO.id,
        updateProductDTO
      );

      if (!updatedProduct) {
        return {
          success: false,
          message: '❌ Product not found',
          error: 'Product with the given ID does not exist',
        };
      }

      return {
        success: true,
        message: '✨ Product updated successfully',
        product: updateProductDTO,
      };
    } catch (error) {
      return {
        success: false,
        message: '❌ Failed to update product',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
