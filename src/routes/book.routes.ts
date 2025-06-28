import { Router } from 'express';
import { getBooks, addBook, getReviews, addReview } from '../controllers/book.controller';

const router = Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of all books
 */
router.get('/', getBooks);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book added successfully
 */
router.post('/', addBook);

/**
 * @openapi
 * /books/{id}/reviews:
 *   get:
 *     summary: Get reviews for a book
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/:id/reviews', getReviews);

/**
 * @openapi
 * /books/{id}/reviews:
 *   post:
 *     summary: Add a review to a book
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added
 */
router.post('/:id/reviews', addReview);

export default router;
