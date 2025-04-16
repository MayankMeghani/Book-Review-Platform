import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import bookRoutes from './routes/book.routes.js';
import userRoutes from './routes/user.routes.js';
import reviewRoutes from './routes/review.routes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Book Review Platform API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
