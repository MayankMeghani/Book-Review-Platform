import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Explore from './pages/Explore';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoutes';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/book/:id" element={<BookDetails />} />
        
        <Route path="/profile" element={ <ProtectedRoute>
          <Profile /> </ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
