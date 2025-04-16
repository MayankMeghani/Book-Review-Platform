import Book from '../models/book.js';

// Create a new book (admin only)
export const createBook = async (req, res) => {
  try {
    // Check if the user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Admins only' });
    }

    const { title, author, description, coverImageUrl, bookFileUrl, language } = req.body;

    // Check for duplicate (title + author + language)
    const existingBook = await Book.findOne({ title, author, language });
    if (existingBook) {
      return res.status(400).json({ message: 'Book with same title, author, and language already exists.' });
    }

    // Create a new book
    const newBook = new Book({
      title,
      author,
      description,
      coverImageUrl,
      bookFileUrl,
      language,
    });

    await newBook.save();

    res.status(201).json({
      message: 'Book created successfully',
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};


// Get a single book by ID
export const getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

// Get all books 
export const getAllBooks = async (req, res) => {
  try {

    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// GET /api/books/top-rated
export const getTopRatedBooks = async (req, res) => {
  try {
    // Fetch top-rated books, sorted by averageRating in descending order
    const topRatedBooks = await Book.find().sort({ averageRating: -1 }).limit(4); // Adjust the limit as needed

    res.status(200).json(topRatedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top-rated books', error: error.message });
  }
};
