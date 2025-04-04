import { Router } from 'express';
import { ProductController } from '@/interfaces/controllers/ProductController';
import { CreateProductUseCase } from '@/application/usecases/CreateProductUseCase';
import { GetProductByIdUseCase } from '@/application/usecases/GetProductByIdUseCase';
import { GetAllProductsUseCase } from '@/application/usecases/GetAllProductsUseCase';
import { GetAllProductsByFiltersUseCase } from '@/application/usecases/GetAllProductsByFiltersUseCase';
import { UpdateProductUseCase } from '@/application/usecases/UpdateProductUseCase';
import { DeleteProductUseCase } from '@/application/usecases/DeleteProductUseCase';

const productRoutes = Router();

import { ProductRepository } from '@/infra/repositories/ProductRepository';
import { cacheMiddleware } from '@/infra/middlewares/cacheMiddleware';

const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getAllProductsByFiltersUseCase = new GetAllProductsByFiltersUseCase(
  productRepository
);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

const productController = new ProductController(
  createProductUseCase,
  getProductByIdUseCase,
  getAllProductsUseCase,
  getAllProductsByFiltersUseCase,
  updateProductUseCase,
  deleteProductUseCase
);

productRoutes.post(
  '/products',
  productController.createProduct.bind(productController)
);

productRoutes.get(
  '/products',
  cacheMiddleware(60),
  productController.getAllProducts.bind(productController)
);
productRoutes.get(
  '/products/:id',
  cacheMiddleware(60),
  productController.getProductById.bind(productController)
);

productRoutes.put(
  '/products/:id',
  productController.updateProduct.bind(productController)
);

productRoutes.delete(
  '/products/:id',
  productController.deleteProduct.bind(productController)
);
export default productRoutes;
