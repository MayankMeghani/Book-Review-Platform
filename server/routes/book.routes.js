import express from 'express';
import {
  createBook,
  getBook,
  getAllBooks,
  getTopRatedBooks 
} from '../controllers/bookController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // Protect routes

const router = express.Router();

// Create a new book (admin only)
router.post('/', authMiddleware, createBook);

router.get('/featured', getTopRatedBooks );
// Get a single book by ID
router.get('/:id', getBook);


// Get all books (admin only)
router.get('/', getAllBooks);

export default router;
