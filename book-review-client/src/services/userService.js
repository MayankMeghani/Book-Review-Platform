import db from "../utils/database";

export const loginUser = async (credentials) => {
  try {
    const response = await db.post(`/users/login`, credentials);
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};

export const registerUser = async (data) => {
  try {
    const response = await db.post(`/users/register`, data);
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const getUserProfile = async (userId, token) => {
  try {
    const response = await db.get(`/users/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
  }
};

export const updateUserProfile = async (userID,data,token) => {
  try {
  const res = await db.put(`/users/profile/${userID}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
} catch (error) {
  throw new Error(error.response?.data?.message || "updation failed");
}
};


export const changeUserPassword = async ({ oldPassword, newPassword },token) => {
  try {
    const res = await db.put(`/users/profile/change-password`,
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "updation failed");
  }
};
