import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import ProductController from '../controllers/product.controller';

const router = Router();

router.post('/products', asyncHandler(ProductController.create));
router.get('/products', asyncHandler(ProductController.getAll));
router.get('/products/:id', asyncHandler(ProductController.getById));
router.put('/products/:id', asyncHandler(ProductController.update));
router.delete('/products/:id', asyncHandler(ProductController.delete));

export default router;
