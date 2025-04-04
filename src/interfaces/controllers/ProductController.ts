import { Request, Response } from 'express';
import { CreateProductUseCase } from '@/application/usecases/CreateProductUseCase';
import { CreateProductDTO } from '@/interfaces/dtos/CreateProductDTO';
import { GetProductByIdUseCase } from '@/application/usecases/GetProductByIdUseCase';
import { GetAllProductsUseCase } from '@/application/usecases/GetAllProductsUseCase';
import { GetAllProductsByFiltersUseCase } from '@/application/usecases/GetAllProductsByFiltersUseCase';
import { UpdateProductUseCase } from '@/application/usecases/UpdateProductUseCase';
import { DeleteProductUseCase } from '@/application/usecases/DeleteProductUseCase';
import { ApiResponse } from '../dtos/ResponseMessageDTO';

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getAllProductsByFiltersUseCase: GetAllProductsByFiltersUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase
  ) {
    this.createProduct = this.createProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const productData: CreateProductDTO = req.body;

    try {
      const result = await this.createProductUseCase.execute(productData);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ApiResponse.internalServerError().message,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const hasFilters = Object.keys(req.query).length > 0;

      const result = hasFilters
        ? await this.getAllProductsByFiltersUseCase.execute({
            filters: req.query.filters
              ? JSON.parse(req.query.filters as string)
              : {},
            sort: req.query.sort as string,
            page: req.query.page
              ? parseInt(req.query.page as string, 10)
              : undefined,
            limit: req.query.limit
              ? parseInt(req.query.limit as string, 10)
              : undefined,
          })
        : await this.getAllProductsUseCase.execute();

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ApiResponse.internalServerError().message,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const result = await this.getProductByIdUseCase.execute(id);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(ApiResponse.notFound());
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ApiResponse.internalServerError().message,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const productData = req.body;

    try {
      const result = await this.updateProductUseCase.execute({
        id,
        ...productData,
      });

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ApiResponse.internalServerError().message,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const result = await this.deleteProductUseCase.execute(id);

      if (result) {
        res
          .status(200)
          .json(
            ApiResponse.success({ message: '✨ Product deleted successfully' })
          );
      } else {
        res.status(404).json(ApiResponse.notFound());
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ApiResponse.internalServerError().message,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
