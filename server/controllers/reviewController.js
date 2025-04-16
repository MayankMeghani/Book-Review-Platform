import Review from '../models/review.js';
import Book from '../models/book.js';

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.userId;
    const bookId = req.params.bookId;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Optional: Prevent duplicate reviews by same user
    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const newReview = new Review({
      book: bookId,
      user: userId,
      rating,
      comment
    });

    await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });

  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

export const getReviewsForBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
  
      const reviews = await Review.find({ book: bookId }).populate('user', 'username');
  
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
  };