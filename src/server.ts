import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '@/infra/database/database';
import routes from '@/interfaces/routes';
import { loggerMiddleware } from '@/infra/middlewares/loggerMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', routes);

// Conecta no banco e inicializa o servidor
connectDB()
  .then((): void => {
    app.listen(PORT, (): void => {
      console.log(`🔥 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown): void => {
    console.error('❌ Error starting the server:', error);
  });
