import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { BookOpen, Bookmark, Star, Search } from "lucide-react";

export default function Signin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      showToast("Please enter username and password!", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signin failed");

      localStorage.setItem("token", data.token);
      onLogin(data.token);

      showToast("Signed in successfully!", "success");
      navigate("/bookfinder");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navbar */}
      <Navbar
        token={token}
        onLogout={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      />

      {/* Main split section */}
      <div className="flex flex-1">
        {/* Left Side - BookFinder UI */}
        <div className="hidden md:flex w-1/2 bg-indigo-700 text-white flex-col justify-center items-center p-10 relative overflow-hidden">
          {/* Animated background circles */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-800 rounded-full opacity-30 animate-pulse"></div>

          <h1 className="text-4xl font-bold mb-6 z-10">Welcome to Book Finder</h1>
          <p className="text-lg mb-6 text-indigo-100 z-10 text-center">
            Discover, explore, and save your favorite books in one place.
          </p>

          {/* Features with icons */}
          <div className="flex flex-col gap-4 z-10 text-indigo-200">
            <div className="flex items-center gap-3">
              <BookOpen size={24} className="animate-bounce" />
              <span>Explore thousands of books</span>
            </div>
            <div className="flex items-center gap-3">
              <Bookmark size={24} className="animate-bounce animation-delay-200" />
              <span>Save favorites to your library</span>
            </div>
            <div className="flex items-center gap-3">
              <Search size={24} className="animate-bounce animation-delay-400" />
              <span>Advanced search options</span>
            </div>
            <div className="flex items-center gap-3">
              <Star size={24} className="animate-bounce animation-delay-600" />
              <span>Beautiful UI experience</span>
            </div>
          </div>
        </div>

        {/* Right Side - Signin Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center p-10">
          <div className="w-full max-w-md">
            {toast && (
              <div
                className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md z-50 text-white ${
                  toast.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {toast.msg}
              </div>
            )}

            <form
              onSubmit={handleSignin}
              className="bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-6"
            >
              <h2 className="text-3xl font-bold text-indigo-700 text-center">Sign In</h2>

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-full py-3 font-medium transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-center text-gray-500 text-sm mt-2">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-indigo-600 hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
