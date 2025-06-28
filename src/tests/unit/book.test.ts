import { Request, Response, NextFunction } from 'express';
import { addBook } from '../../controllers/book.controller';
import * as bookService from '../../services/book.service';

describe('Book Controller Unit Tests', () => {
  it('should create and return a new book', async () => {
    const mockBook = { id: 1, title: 'New Book' };

    const req = {
      body: { title: 'New Book' },
    } as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    jest.spyOn(bookService, 'addBook').mockResolvedValue(mockBook as any);

    await addBook(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockBook);
  });
});
