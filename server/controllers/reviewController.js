import Review from '../models/review.js';
import Book from '../models/book.js';

export const addReview = async (req, res) => {
  try {
    const { rating, comment, bookId } = req.body;
    const userId = req.user.userId;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Prevent duplicate reviews by same user
    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    // Save new review
    const newReview = new Review({
      book: bookId,
      user: userId,
      rating,
      comment
    });

    await newReview.save();

    // Calculate new average rating
    const allReviews = await Review.find({ book: bookId });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;

    // Update book's averageRating
    book.averageRating = averageRating;
    await book.save();

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