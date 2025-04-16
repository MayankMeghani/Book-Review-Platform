import express from 'express';
import { addReview,getReviewsForBook } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Add a review to a book
router.post('/:bookId', authMiddleware, addReview);
router.get('/book/:bookId', getReviewsForBook);

export default router;
