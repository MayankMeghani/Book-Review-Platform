import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, changeUserPassword } from '../services/userService';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, token } = useAuth();

  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  // Password change states
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile(user.id,token);
        setUserProfile(data);
        setBio(data.bio || '');
      } catch (err) {
        toast.error('Failed to fetch user profile');
      }
    };

    fetchUser();
  }, []);

  const handleSaveBio = async () => {
    try {
      setLoading(true);
      const updatedUser = await updateUserProfile(user.id,{ bio },token);
      setUserProfile(updatedUser);
      toast.success('Bio updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update bio');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setChangingPass(true);
      await changeUserPassword({ oldPassword, newPassword },token);
      toast.success('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
      setChangePasswordMode(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setChangingPass(false);
    }
  };

  if (!userProfile) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">

          {/* User Info */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{userProfile.username}</h1>
            <span className="text-gray-600">
              Joined {new Date(userProfile.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Bio Section */}
          <div className="mb-8 border-b pb-6">
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
                  disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            ) : (
              <p className="text-gray-700">{userProfile.bio || 'No bio added yet.'}</p>
            )}
          </div>

          {/* Change Password Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
              <button
                onClick={() => setChangePasswordMode(!changePasswordMode)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                {changePasswordMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {changePasswordMode && (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handleChangePassword}
                  disabled={changingPass}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {changingPass ? 'Updating...' : 'Update Password'}
                </button> 
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
