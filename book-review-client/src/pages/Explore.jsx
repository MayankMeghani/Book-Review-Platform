import React, { useEffect, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import BookCard from '../components/BookCard';
import {  languages } from '../data/sampleData'; // Assuming languages is available in your sampleData
import AddBookForm from '../forms/Bookform';
import { getAllBooks } from '../services/bookService';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal'; // Import the modal component

export default function Explore() {
  const { user, token } = useAuth();
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('All'); // New state for language filter
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const booksPerPage = 8;

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage = language === 'All' || book.language === language; // Language filter
    return matchesSearch && matchesLanguage;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by title or author..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Language Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            {/* Add Book Button (Admin only) */}
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                <Plus size={18} /> {showAddForm ? 'Close' : 'Add Book'}
              </button>
            )}
          </div>
        </div>

        {/* Modal for Add Book Form */}
        <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
          <AddBookForm onSuccess={() => {
            fetchBooks();
            setShowAddForm(false);
          }} />
        </Modal>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
