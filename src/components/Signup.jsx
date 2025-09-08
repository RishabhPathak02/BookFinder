import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Reusable Navbar

export default function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      showToast("Please enter username and password!", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      // Store token
      localStorage.setItem("token", data.token);
      onLogin(data.token);

      showToast("Signup successful!", "success");
      navigate("/bookfinder"); // redirect to Bookfinder
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <Navbar
        token={token}
        onLogout={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      />

      {/* Signup Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
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
          onSubmit={handleSignup}
          className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-indigo-700 text-center">Signup</h2>
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
            {loading ? "Signing up..." : "Signup"}
          </button>
          <p className="text-center text-gray-500 text-sm mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Signin
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
