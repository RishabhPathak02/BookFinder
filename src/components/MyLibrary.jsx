import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen } from "lucide-react";
import Navbar from "./Navbar";

function MyLibrary() {
  const [library, setLibrary] = useState([]);
  const [toast, setToast] = useState({ msg: "", type: "" });
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");
  const BACKEND_URL = "http://localhost:5000/api/library";
  const BACKEND_USER = "http://localhost:5000/api/me";

  // Toast helper
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 3000);
  };

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await fetch(BACKEND_USER, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsername(data.username);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
    fetchUser();
  }, [token]);

  // Fetch library
  useEffect(() => {
    const fetchLibrary = async () => {
      if (!token) return;
      try {
        const res = await fetch(BACKEND_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLibrary(data);
      } catch (err) {
        console.error("Failed to fetch library:", err);
      }
    };
    fetchLibrary();
  }, [token]);

  // Remove book
  const removeFromLibrary = async (id, title) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to remove book");
      setLibrary((prev) => prev.filter((b) => b._id !== id));
      showToast(`${title} removed from library!`, "error");
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/"; // redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-all">
      {/* Navbar */}
      <Navbar token={token} username={username} onLogout={handleLogout} />

      {/* Toast */}
      {toast.msg && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded-xl shadow-lg z-50 text-white font-medium text-sm animate-fade ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/bookfinder"
          className="inline-flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-semibold transition"
        >
          <Home size={20} /> Back to BookFinder
        </Link>

        <div className="inline-flex items-center gap-2 text-indigo-800 font-bold text-2xl sm:text-3xl">
          <BookOpen size={28} className="text-indigo-600" />
          {username ? `${username}'s Library` : "My Library"}
        </div>
      </div>

      {/* Library Grid */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        {library.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-12">
            Your library is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {library.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col h-[460px] hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={
                    book.cover
                      ? `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`
                      : "https://via.placeholder.com/150x220?text=No+Cover"
                  }
                  alt={book.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-semibold text-lg mb-1 line-clamp-2 text-gray-800">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                    {book.authors?.join(", ") || "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    First published: {book.first_publish_year || "N/A"}
                  </p>
                  <button
                    onClick={() => removeFromLibrary(book._id, book.title)}
                    className="mt-auto w-full text-center bg-red-100 hover:bg-red-200 rounded-xl px-4 py-2 text-sm font-semibold text-red-700 transition-colors"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLibrary;
