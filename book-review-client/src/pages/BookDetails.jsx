import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import ReviewCard from '../components/ReviewCard';
import { getBookById } from '../services/bookService';
import { getReviewsForBook, addReview } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';

export default function BookDetails() {
  const { id } = useParams();
  const { user, token } = useAuth();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  // Fetch book and reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getBookById(id);
        const reviewData = await getReviewsForBook(id);
        setBook(bookData);
        setReviews(reviewData);
      } catch (error) {
        console.error('Error loading book/reviews:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!book) {
    return <div className="text-center mt-8 text-lg">Book not found</div>;
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to submit a review!');
      return;
    }
    if (user.role == 'admin') {
      toast.error(`admins can't submit a review!`);
      return;
    }

    try {
      const reviewData = {
        comment: newReview,
        rating,
        bookId: id,
      };

      await addReview(reviewData, token);
      toast.success('Review submitted successfully!');
      setNewReview('');
      setRating(5);

      // Refresh reviews
      const updatedReviews = await getReviewsForBook(id);
      setReviews(updatedReviews);
    } catch (error) {
      toast.error(error.message ||'Failed to submit review');
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Book Info */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={book.coverImageUrl}
                alt={book.title}
              />
            </div>
            <div className="p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-gray-600 mb-4">by {book.author}</p>
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-2 text-gray-700">{book.averageRating}/5.0</span>
              </div>
              <p className="text-gray-700 mb-4">{book.description}</p>
              <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {book.category}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
          {currentReviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {currentReviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded-md ${currentPage === index + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

          {/* Review Form */}
          <form onSubmit={handleSubmitReview} className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none mr-1"
                    aria-label={`Rate ${star} stars`}
                  >
                    {star <= rating ? "⭐" : "☆"}
                  </button>
                ))}
                <span className="ml-2 text-gray-600">
                  {rating} {rating === 1 ? "star" : "stars"}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Review <span className="text-red-500">*</span></label>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                placeholder="Write your review here..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
