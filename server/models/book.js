import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  coverImageUrl: String, // URL from Firebase
  categories: [String],
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
