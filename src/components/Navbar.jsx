// components/Navbar.jsx
import React, { useState } from "react";
import { Home, BookOpen, Library, Info, LogOut, LogIn, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen size={24} /> Book Finder
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
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

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-indigo-200 transition flex items-center gap-1"
            onClick={() => setIsOpen(false)}
          >
            <Home size={18} /> Home
          </Link>
          <Link
            to="/bookfinder"
            className="hover:text-indigo-200 transition flex items-center gap-1"
            onClick={() => setIsOpen(false)}
          >
            <Library size={18} /> Book Finder
          </Link>
          <Link
            to="/about"
            className="hover:text-indigo-200 transition flex items-center gap-1"
            onClick={() => setIsOpen(false)}
          >
            <Info size={18} /> About
          </Link>

          {token ? (
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-1 hover:text-red-400 transition text-sm font-medium"
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="flex items-center gap-1 hover:text-green-400 transition text-sm font-medium"
            >
              <LogIn size={16} /> Signin
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
