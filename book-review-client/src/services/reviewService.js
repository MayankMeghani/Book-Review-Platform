import db from "../utils/database"
// Get all reviews for a book
export const getReviewsForBook = async (bookId) => {
    try {
      const res = await db.get(`/reviews/book/${bookId}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching reviews for book:", error);
      return []; // Return empty array if error occurs
    }
  };
  
  // Add a new review
  export const addReview = async (review, token) => {
    try {
      await db.post(`/reviews`, review, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error adding review:", error);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };
  