import request from 'supertest';
import app from '../../index';
import { redisClient } from '../../config/redis';

describe('Book API Integration - Cache Miss', () => {
  beforeAll(async () => {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    await redisClient.del('books');
  });

  afterAll(async () => {
    if (redisClient.isOpen) {
      await redisClient.quit();
    }
  });

  it('should fetch books from DB (not cache)', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
