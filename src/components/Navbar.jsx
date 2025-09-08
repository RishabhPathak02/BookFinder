// components/Navbar.jsx
import React from "react";
import { Home, BookOpen, Library, Info, LogOut, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen size={24} /> Book Finder
        </h1>
        <div className="flex gap-6 text-sm font-medium items-center">
          <Link to="/" className="hover:text-indigo-200 transition flex items-center gap-1">
            <Home size={18} /> Home
          </Link>
          <Link to="/bookfinder" className="hover:text-indigo-200 transition flex items-center gap-1">
            <Library size={18} /> Book Finder
          </Link>
          <Link to="/about" className="hover:text-indigo-200 transition flex items-center gap-1">
            <Info size={18} /> About
          </Link>

          {token ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-1 hover:text-red-400 transition text-sm font-medium"
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 hover:text-green-400 transition text-sm font-medium"
            >
              <LogIn size={16} /> Signin
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
