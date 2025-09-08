import React from "react";
import { BookOpen, Search, FileText, Heart, Code } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col items-center">
      <div className="max-w-5xl bg-white rounded-2xl shadow-lg p-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={36} className="text-indigo-600" />
          <h1 className="text-3xl font-bold text-indigo-700">About Book Finder</h1>
        </div>

        {/* App description */}
        <p className="text-gray-700 text-lg leading-relaxed">
          <span className="font-semibold">Book Finder</span> is a modern web application built for readers, students, and book enthusiasts. It helps you search, discover, and explore books effortlessly using data from the Open Library API. Get detailed information including book title, authors, publication date, subjects, cover images, and even excerpts.
        </p>

        {/* How it works */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <Search size={20} /> How It Works
          </h2>
          <p className="text-gray-700">
            Simply enter your search query and select a filter (title, author, ISBN, or subject). Click search and the app fetches relevant results instantly. Click on any book to see detailed information and explore authors, subjects, and excerpts.
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <FileText size={20} /> Key Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Search books by title, author, ISBN, or subject</li>
            <li>View detailed book information with cover, description, subjects, and excerpts</li>
            <li>Navigate seamlessly between search results and book details pages</li>
            <li>Save favorite books to "My Library" (database integration planned)</li>
            <li>Responsive and visually appealing UI for all devices</li>
          </ul>
        </div>

        {/* Technologies */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <Code size={20} /> Technologies Used
          </h2>
          <p className="text-gray-700">
            Built with <span className="font-semibold">React</span>, <span className="font-semibold">React Router</span>, <span className="font-semibold">Tailwind CSS</span>, <span className="font-semibold">Lucide Icons</span>, and the <span className="font-semibold">Open Library API</span> for fetching book data.
          </p>
        </div>

        {/* Future Plans */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <Heart size={20} /> Future Plans
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Integrate user accounts and save personal libraries</li>
            <li>Add book ratings and reviews</li>
            <li>Provide personalized recommendations</li>
            <li>Support advanced search with multiple filters and sorting</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6">
          <p className="text-gray-700 text-lg mb-4">
            Ready to explore your next favorite book? Start searching now!
          </p>
      
          <a
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:-translate-y-1"
          >
             Search Books
          </a>
        </div>
      </div>
    </div>
  );
}
