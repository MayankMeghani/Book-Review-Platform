// src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 text-indigo-600 hover:text-indigo-800">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
