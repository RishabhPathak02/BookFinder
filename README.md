# 📚 Book Finder – Frontend

A modern React-based frontend for the **Book Finder** application.
It lets users search books via the Open Library API, save them to their personal library (via backend + MongoDB), and manage their collection with a clean, responsive UI.

---

## 🚀 Features

* 🔍 **Search Books** using Open Library API
* ➕ **Add to Library** (saved in MongoDB via backend API)
* 📖 **My Library** page with remove option
* 🖼️ **Dynamic Book Covers** from Open Library
* 🎨 **Modern UI** with TailwindCSS + shadcn/ui
* 🧭 **Navigation** using React Router (Home, My Library)
* 🪪 **Custom SVG Logo** for branding

---

## 🛠️ Tech Stack

### Core

* [React 18](https://react.dev/) – Component-based frontend
* [React Router DOM](https://reactrouter.com/) – Client-side routing
* [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
* [shadcn/ui](https://ui.shadcn.com/) – Prebuilt accessible UI components

### APIs

* [Open Library API](https://openlibrary.org/developers/api) – Fetch book details
* **Custom Backend API** – Connects to MongoDB for persistence

### Other

* [Lucide Icons](https://lucide.dev/) – Modern SVG icons
* [Framer Motion](https://www.framer.com/motion/) *(optional)* – Smooth animations

---

## 📂 Project Structure

```
/client
 ├── /public
 ├── /src
 │    ├── /components     # Reusable UI components (Navbar, BookCard, etc.)
 │    ├── /pages          # Home, MyLibrary
 │    ├── App.jsx         # Routing setup
 │    ├── index.jsx       # React entry point
 │    └── styles.css      # Tailwind styles
 └── package.json
```

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/book-finder.git
cd book-finder/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Frontend runs on:
👉 `http://localhost:5173` (Vite default)

---

## 🔗 Backend Connection

Update your API base URL in components:

```js
const BACKEND_URL = "http://localhost:5000/api/library";
```

Make sure your backend server (Node + MongoDB) is running before testing features like **Add to Library** or **Remove Book**.

---

## 🖼️ UI Preview

* Home: Search & Add books
* My Library: View & Remove saved books

---

## 📜 License

MIT License © 2025
