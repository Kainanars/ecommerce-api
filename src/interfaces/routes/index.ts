import { Router } from 'express';
import { loggerMiddleware } from '@/infra/middlewares/loggerMiddleware';

const router = Router();

router.get('/health', loggerMiddleware, (req, res) => {
  res.json({ message: '🚀 Route working!' });
});

export default router;
