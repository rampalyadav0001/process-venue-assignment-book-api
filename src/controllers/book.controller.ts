import { Request, Response, NextFunction } from 'express';
import * as service from '../services/book.service';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await service.getBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await service.addBook(req.body.title);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await service.getReviews(+req.params.id);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const addReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await service.addReview(+req.params.id, req.body.content);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};