
# 📚 BookNest

**BookNest** is a full-stack web application where users can explore, review, and rate books. It features a clean and responsive UI, user authentication, role-based access control, and Firebase storage support.

---

## 🚀 Features

- User registration and login
- Explore featured books
- View detailed book reviews and ratings
- Admin users can add new books
- Authenticated users can write their reviews
- Role-based access: Admin vs Regular User
- Protected profile page
- Backend deployed on Render with MongoDB Atlas
- Firebase used for book cover image storage
- Responsive and modern UI with Tailwind CSS


---

## 🛠️ Tech Stack

### Frontend:
- React (with Vite)
- React Router DOM
- Tailwind CSS
- Firebase (for image storage)

### Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- CORS, bcrypt, JSON Web Tokens

---

## 📦 Folder Structure

```
booknest/
├── book-review-client/    # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   |   └── utils/
├── server/    # Node/Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
```

---

## ⚙️ Environment Variables

Create a `.env` file in both the `server/` and `client/` directories.

### Backend (.env):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
```

###  Frontend (.env)

Create a `.env` file in `book-review-client/`:

```env
VITE_API_URL=https://your-backend-url.onrender.com

# Firebase Config
VITE_API_KEY=your-api-key
VITE_AUTH_DOMAIN=your-auth-domain
VITE_PROJECTID=your-project-id
VITE_STORAGE_BUCKET=your-storage-bucket
VITE_SENDER_ID=your-sender-id
VITE_APP_ID=your-app-id
```

---

## 🧪 Running Locally

### 1. Clone the Repo

```bash
git clone https://github.com/MayankMeghani/Book-Review-Platform
cd Book-Review-Platform
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd ../book-review-client
npm install
npm run dev
```

---

## 🌐 Deployment

- **Backend** deployed on [Render](https://render.com/)
- **Frontend** deployed on [Render](https://render.com/)

Make sure your CORS and environment variables are set correctly on Render.

---

## 🔒 Protected Routes & Role-Based Access with Firebase Storage

- Only authenticated users can access protected pages like the dashboard and post reviews.
- JWTs (JSON Web Tokens) are used for managing user sessions, stored in cookies or localStorage.
- Admin-only features (like adding new books) are protected using role-based logic extracted from the backend JWT payload.
- **Firebase** is integrated solely for secure storage of book images.
- Admin users can upload book cover images to Firebase Storage when adding new books via the admin panel.
---


## ❌ Not Found Page

A friendly 404 page is shown for all unmatched routes to enhance user experience.
---
