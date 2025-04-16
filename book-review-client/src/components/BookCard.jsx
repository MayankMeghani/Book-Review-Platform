import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';


export default function BookCard({ book, featured = false }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${featured ? 'h-full' : ''}`}>
      <img
        src={book.coverImageUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <div className="flex items-center mt-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{book.averageRating}/5.0</span>
        </div>
        <Link
          to={`/book/${book._id}`}
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}