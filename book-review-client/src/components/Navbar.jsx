import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BookNest</span>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Home</Link>
            <Link to="/explore" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Explore</Link>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  {user?.username+"'s Profile"|| "Profile"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 px-3 py-2"
                >
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
        </div>
      </div>
    </nav>
  );
}
