import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { AppDataSource } from './config/data-source';
import { connectRedis } from './config/redis';
import bookRoutes from './routes/book.routes';
import swaggerSpec from './docs/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/books', bookRoutes);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    await connectRedis();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('App start failed:', err);
  }
};

startServer();
export default app;
