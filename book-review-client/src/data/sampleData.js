export const books = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever...',
    category: 'Fiction',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    category: 'Non-fiction',
    rating: 4.8,
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
    description: 'A psychological thriller that will keep you guessing until the end',
    category: 'Mystery',
    rating: 4.3,
  },
];

export const reviews= [
  {
    id: '1',
    bookId: '1',
    userId: '1',
    rating: 5,
    text: 'A beautiful and thought-provoking story that will stay with you.',
    date: '2024-03-15',
  },
  {
    id: '2',
    bookId: '1',
    userId: '2',
    rating: 4,
    text: 'Engaging narrative with deep philosophical undertones.',
    date: '2024-03-14',
  },
];

export const currentUser = {
  id: '1',
  username: 'bookworm42',
  bio: 'Avid reader and book reviewer. Love discovering new stories!',
  joinedDate: '2023-01-15',
  reviews: reviews.filter(review => review.userId === '1'),
};

export const categories = [
  'All',
  'Fiction',
  'Non-fiction',
  'Mystery',
  'Science Fiction',
  'Romance',
  'Biography',
];