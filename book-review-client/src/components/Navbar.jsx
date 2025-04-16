import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">BookNest</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Home</Link>
            <Link to="/explore" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Explore</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  {user?.username ? `${user.username}'s Profile` : "Profile"}
                </Link>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 px-3 py-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Login</Link>
                <Link to="/register" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Home</Link>
          <Link to="/explore" className="block text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Explore</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="block text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>
                {user?.username ? `${user.username}'s Profile` : "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Login</Link>
              <Link to="/register" className="block text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
