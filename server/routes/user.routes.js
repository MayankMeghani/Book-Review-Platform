import express from 'express';
import {
  userRegistration,
  userLogin,
  getUser,
  updateUser,
  getAllUsers,
  changePassword
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // Protect routes

const router = express.Router();

// User registration route
router.post('/register', userRegistration);

// User login route
router.post('/login', userLogin);

// Get user profile (protected route)
router.get('/profile/:id', authMiddleware, getUser);

// Update user profile (protected route)
router.put('/profile/change-password', authMiddleware, changePassword);

router.put('/profile/:id', authMiddleware, updateUser);

// Admin route to get all users (protected admin route)
router.get('/all', authMiddleware, getAllUsers);

export default router;
