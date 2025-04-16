import express from 'express';
import { addReview,getReviewsForBook } from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add a review to a book
router.post('/', authMiddleware, addReview);
router.get('/book/:bookId', getReviewsForBook);

export default router;
