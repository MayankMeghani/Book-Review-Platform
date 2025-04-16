import React from 'react';
import BookCard from '../components/BookCard';
import { books } from '../data/sampleData';

export default function Home() {
  const featuredBooks = books.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to BookReviews</h1>
          <p className="text-xl text-gray-600">Discover your next favorite book</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} featured />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}