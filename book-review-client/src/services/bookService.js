import db from  "../utils/database"


export const getAllBooks = async () => {
  const response = await db.get(`/books`);
  return response.data;
};

export const createBook = async (bookData, token) => {
  try {
    const response = await db.post(`/books`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error; 
  }
};

export const fetchFeaturedBooks = async () => {
  try {
    const res = await db.get(`/books/featured`);
    return res.data;
  } catch (error) {
    console.error("Error fetching featured books:", error);
    return []; 
  }
};


export const getBookById = async (id) => {
  try {
    const res = await db.get(`/books/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return null; 
  }
};

