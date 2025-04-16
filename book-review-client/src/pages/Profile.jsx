import React, { useState } from 'react';
import { currentUser } from '../data/sampleData';
import ReviewCard from '../components/ReviewCard';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);

  const handleSaveBio = () => {
    setIsEditing(false);
    // Handle bio update here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{currentUser.username}</h1>
            <span className="text-gray-600">
              Joined {new Date(currentUser.joinedDate).toLocaleDateString()}
            </span>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Bio</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <div>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 mb-2"
                />
                <button
                  onClick={handleSaveBio}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-gray-700">{bio}</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Reviews</h2>
            <div className="space-y-4">
              {currentUser.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}