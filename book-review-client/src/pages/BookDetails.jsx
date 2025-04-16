import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import { books, reviews } from '../data/sampleData';

export default function BookDetails() {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);
  const bookReviews = reviews.filter((r) => r.bookId === id);

  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Handle review submission here
    setNewReview('');
    setRating(5);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={book.coverImage}
                alt={book.title}
              />
            </div>
            <div className="p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-gray-600 mb-4">by {book.author}</p>
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-2 text-gray-700">{book.rating}</span>
              </div>
              <p className="text-gray-700 mb-4">{book.description}</p>
              <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {book.category}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
          <div className="space-y-4">
            {bookReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <form onSubmit={handleSubmitReview} className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>{num} stars</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                placeholder="Write your review here..."
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