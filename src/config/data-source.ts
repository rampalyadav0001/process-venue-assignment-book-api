import { DataSource } from 'typeorm';
import { Book } from '../models/Book';
import { Review } from '../models/Review';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'bookreview',
  synchronize: true,
  entities: [Book, Review],
});
