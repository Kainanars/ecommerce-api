import { Request, Response, NextFunction } from 'express';

const getEmoji = (method: string) => {
  switch (method) {
    case 'GET':
      return '📗';
    case 'POST':
      return '📘';
    case 'PUT':
      return '📝';
    case 'PATCH':
      return '🛠️';
    case 'DELETE':
      return '🗑️';
    default:
      return '📄';
  }
};

export const loggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const chalk = (await import('chalk')).default; // Importação dinâmica
  
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const emoji = getEmoji(req.method);
    const statusColor = res.statusCode >= 400 ? chalk.red : chalk.green;

    console.log(
      `${emoji} ${chalk.bold(req.method)} ${chalk.cyan(req.originalUrl)} ` +
        `| Status: ${statusColor(
          res.statusCode
        )} | ⏳ ${duration}ms | 📌 IP: ${chalk.magenta(req.ip)}`
    );
  });

  next();
};
