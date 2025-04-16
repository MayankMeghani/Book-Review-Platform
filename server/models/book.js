import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  coverImageUrl: { type: String, required: true }, 
  language: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
