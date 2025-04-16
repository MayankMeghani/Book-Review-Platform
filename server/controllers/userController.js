import User from '../models/user.js'; // Adjust path as needed
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User registration
export const userRegistration = async (req, res) => {
  try {
    const { email,username, password, role } = req.body;
    
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'email already exists' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        email: newUser.email,
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// User login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Get user profile (protected route)
export const getUser = async (req, res) => {
  try {
    const requestedId = req.params.id;
    const loggedInUserId = req.user.userId;

    if (requestedId !== loggedInUserId) {
        return res.status(403).json({ message: 'Access denied: Unauthorized user' });
      }
    const user = await User.findById(loggedInUserId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update user profile (protected route)
export const updateUser = async (req, res) => {
  try {
    const { bio } = req.body;
    const requestedId = req.params.id;
    const loggedInUserId = req.user.userId;

    if (requestedId !== loggedInUserId) {
        return res.status(403).json({ message: 'Access denied: Unauthorized user' });
      }

    const updatedUser = await User.findByIdAndUpdate(
      loggedInUserId,
      { bio },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};

// Admin route to get all users (protected admin route)
export const getAllUsers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};
