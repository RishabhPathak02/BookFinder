// App.jsx
import React, { useState } from "react";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Bookfinder from "./components/Bookfinder";
import MyLibrary from "./components/MyLibrary";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import About from './components/About'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
      <Routes>
        {/* Signin page */}
        <Route path="/" element={<Signin onLogin={setToken} />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup onLogin={setToken} />} />

        {/* Book Finder page */}
        <Route path="/bookfinder" element={<Bookfinder token={token} />} />

        {/* My Library page */}
        <Route path="/mylibrary" element={<MyLibrary token={token} />} />

        {/*About page*/}
        <Route path="/about" element={<About />} />
      </Routes>
  );
}
