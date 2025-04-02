import NodeCache from 'node-cache';
import { Request, Response, NextFunction } from 'express';

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); // TTL = 60s

export const cacheMiddleware = (
  duration: number
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`🚀 Cache hit: ${key}`);
      res.json(cachedResponse);
      return;
    }

    const originalJson = res.json.bind(res);

    res.json = (body): Response => {
      cache.set(key, body, duration);
      return originalJson(body);
    };

    next();
  };
};
