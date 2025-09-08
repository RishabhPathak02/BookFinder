import React, { useState, useEffect } from "react";
import { Search, BookOpen, Home, Library, Info, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Toast Component
const Toast = ({ message, type = "success" }) => {
  if (!message) return null;
  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg z-50 text-white font-medium animate-fade ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

// BookCard Component
function BookCard({ book, onSave, disabled }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-white flex flex-col h-[440px]">
      <img src={coverUrl} alt={book.title} className="w-full h-56 object-cover" />
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-semibold text-lg mb-1 line-clamp-2 text-gray-800">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-1 line-clamp-1">
          {book.author_name?.join(", ") || "Unknown Author"}
        </p>
        <p className="text-xs text-gray-500 mb-2">
          First published: {book.first_publish_year || "N/A"}
        </p>
        {book.isbn && <p className="text-xs text-gray-500 mb-3">ISBN: {book.isbn[0]}</p>}
        <button
          onClick={() => onSave(book)}
          disabled={disabled}
          className={`mt-auto block w-full text-center rounded-lg px-4 py-2 text-sm font-medium transition ${
            disabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-100 hover:bg-green-200 text-green-700"
          }`}
        >
          📚 {disabled ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

// Main Component
export default function Bookfinder() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("title");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [library, setLibrary] = useState([]);
  const [toast, setToast] = useState({ msg: "", type: "success" });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const API_BASE = "https://bookfinder-backend-1.onrender.com/api/library";

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

  // Fetch library
  useEffect(() => {
    if (!token) return;

    const fetchLibrary = async () => {
      try {
        const res = await fetch(API_BASE, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (res.status === 401) {
            showToast("Session expired. Please login again.", "error");
            localStorage.removeItem("token");
            setToken("");
            navigate("/");
            return;
          }
          throw new Error("Failed to fetch library");
        }
        const data = await res.json();
        setLibrary(data);
      } catch (err) {
        console.error(err);
        showToast(err.message, "error");
      }
    };
    fetchLibrary();
  }, [token, navigate]);

  // Save book
  const addToLibrary = async (book) => {
    if (!token) {
      showToast("You must sign in to save books!", "error");
      return;
    }

    if (library.some((b) => b.key === book.key)) {
      showToast("Book already in library!", "error");
      return;
    }

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: book.key,
          title: book.title,
          authors: book.author_name || [],
          cover: book.cover_i,
          first_publish_year: book.first_publish_year,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save book");
      setLibrary((prev) => [...prev, data]);
      showToast(`${book.title} added to library!`);
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    }
  };

  // Search books
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?${filter}=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setBooks(data.docs?.slice(0, 20) || []);
      if (data.docs?.length === 0) showToast("No books found.", "error");
    } catch {
      showToast("Failed to fetch books.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toast message={toast.msg} type={toast.type} />

      {/* Navbar */}
      <nav className="bg-indigo-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex justify-center items-center gap-2">
            <BookOpen size={25} /> Book Finder
          </h1>
          <div className="flex gap-6 text-sm font-medium items-center">
            <Link to="/" className="hover:text-indigo-200 transition flex items-center gap-1">
              <Home size={18} /> Home
            </Link>
            <Link to="/mylibrary" className="hover:text-indigo-200 transition flex items-center gap-1">
              <Library size={18} /> My Library
            </Link>
            <Link to="/about" className="hover:text-indigo-200 transition flex items-center gap-1">
              <Info size={18} /> About
            </Link>
            {token && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-red-400 transition text-sm font-medium"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Search */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder={`Search by ${filter}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-full shadow-lg border border-gray-300 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400 transition"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-full shadow-lg border border-gray-300 px-5 py-3 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="isbn">ISBN</option>
            <option value="subject">Subject</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full shadow-lg px-6 py-3 flex items-center gap-2 font-medium transition-transform transform hover:-translate-y-0.5"
          >
            <Search size={18} /> {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              onSave={addToLibrary}
              disabled={library.some((b) => b.key === book.key)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
