import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { registerUser } from '../services/userService'; // use your service method
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user', // default value
  });
  const navigate = useNavigate();
  const {isAuthenticated,logout} = useAuth();
    useEffect(() => {
      if (isAuthenticated) {
        logout();
      }
    }, []); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("login");
      toast.success('Registered successfully! Please login.');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full px-3 py-2 border rounded"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
