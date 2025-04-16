import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { fetchFeaturedBooks } from "../services/bookService";

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const books = await fetchFeaturedBooks();
        setFeaturedBooks(books);
      } catch (err) {
        console.error("Failed to fetch featured books", err);
      }
    };
    loadBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to BookReviews</h1>
          <p className="text-xl text-gray-600">Discover your next favorite book</p>
        </div>

        <section className="mb-12 border border-gray-300 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Featured Books</h2>
            <button
              className="text-indigo-600 hover:text-indigo-800 font-medium"
              onClick={() => navigate("/explore")}
            >
              Explore More
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} featured />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
