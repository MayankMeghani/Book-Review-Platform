import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { createBook } from "../services/bookService";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase";

export default function AddBookForm({ onSuccess }) {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("English");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file) => {
    const fileRef = ref(storage, `book-covers/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    setUploading(true);
    try {
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          reject,
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setCoverImageUrl(downloadURL);
            resolve();
          }
        );
      });
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImageUrl) {
      toast.error("Please upload a cover image.");
      return;
    }
    try {
      const newBook = {
        title,
        author,
        description,
        language,
        coverImageUrl,
      };
      await createBook(newBook, token);
      toast.success("Book added successfully");
      onSuccess();
    } catch (err) {
      toast.error(err.message || "Error adding book");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      {/* 🔽 Language Dropdown */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="English">English</option>
        <option value="Hindi">Gujarati</option>
        <option value="Hindi">Hindi</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Chinese">Chinese</option>
        {/* add more as needed */}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) handleImageUpload(file);
        }}
        className="w-full border px-3 py-2 rounded"
        required={!coverImageUrl}
      />

      {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}

      {/* {coverImageUrl && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">Uploaded Image Preview:</p>
          <img
            src={coverImageUrl}
            alt="Cover Preview"
            className="w-32 h-48 object-cover border rounded"
          />
        </div>
      )} */}

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Book"}
      </button>
    </form>
  );
}
