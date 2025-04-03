import { Router } from 'express';
import { loggerMiddleware } from '@/infra/middlewares/loggerMiddleware';
import ProductRouter from "./product.routes"

const router = Router();

router.use(ProductRouter)
router.get('/health', loggerMiddleware, (req, res) => {
  res.json({ message: '🚀 Route working!' });
});

export default router;
