import { AppDataSource } from '../config/data-source';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import { redisClient } from '../config/redis';


function logRedisError(action: string, err: unknown) {
  if (err instanceof Error) {
    console.warn(`Redis ${action} failed:`, err.message);
  } else {
    console.warn(`Redis ${action} failed with unknown error`);
  }
}


export const getBooks = async (): Promise<Book[]> => {
  try {
    const cache = await redisClient.get('books');
    if (cache) {
      console.log('Fetched books from Redis cache');
      return JSON.parse(cache);
    }
  } catch (err) {
    logRedisError('GET books', err);
  }

  const bookRepo = AppDataSource.getRepository(Book);
  const books = await bookRepo.find();

  try {
    await redisClient.set('books', JSON.stringify(books));
  } catch (err) {
    logRedisError('SET books', err);
  }

  return books;
};

export const addBook = async (title: string): Promise<Book> => {
  const bookRepo = AppDataSource.getRepository(Book);
  const book = bookRepo.create({ title });
  const savedBook = await bookRepo.save(book);
  try {
    await redisClient.del('books');
  } catch (err) {
    logRedisError('DEL books cache', err);
  }

  return savedBook;
};


export const getReviews = async (bookId: number): Promise<Review[]> => {
  const reviewRepo = AppDataSource.getRepository(Review);
  return await reviewRepo.find({
    where: { book: { id: bookId } },
    relations: ['book'],
  });
};


export const addReview = async (bookId: number, content: string): Promise<Review> => {
  const bookRepo = AppDataSource.getRepository(Book);
  const reviewRepo = AppDataSource.getRepository(Review);

  const book = await bookRepo.findOneOrFail({ where: { id: bookId } });
  const review = reviewRepo.create({ content, book });

  return await reviewRepo.save(review);
};
