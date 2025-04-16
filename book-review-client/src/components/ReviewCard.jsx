import React from 'react';
import { Star } from 'lucide-react';


export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-700">{review.text}</p>
    </div>
  );
}