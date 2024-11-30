import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { useEffect, useState, createContext } from "react";

export const CartContext = createContext();

export default function App() {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [fav, setFavorit] = useState(savedFavorites);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("id-asc");

  // Simpan favorit ke LocalStorage
  useEffect(() => {
    if (Array.isArray(fav)) {
      localStorage.setItem("favorites", JSON.stringify(fav));
    } else {
      console.error("Favorites is not an array");
    }
  }, [fav]);

  // Fetch books saat pertama kali aplikasi dimuat
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("book"));
    if (savedBooks) {
      setBooks(savedBooks);
      setFilteredBooks(savedBooks);
    } else {
      fetch("/book.json")
        .then((response) => response.json())
        .then((data) => {
          setBooks(data);
          setFilteredBooks(data);
          localStorage.setItem("book", JSON.stringify(data));
        });
    }
  }, []);

  // Fungsi untuk menangani pencarian dan pengurutan
  const updateFilteredBooks = () => {
    const lowerCaseSearch = search.toLowerCase();

    let updatedBooks = books.filter(
      (book) =>
        book.judul.toLowerCase().includes(lowerCaseSearch) ||
        book.pengarang.toLowerCase().includes(lowerCaseSearch)
    );

    if (sortOrder === "id-asc") {
      updatedBooks.sort((a, b) => a.id - b.id);
    } else if (sortOrder === "judul-asc") {
      updatedBooks.sort((a, b) => a.judul.localeCompare(b.judul));
    } else if (sortOrder === "judul-desc") {
      updatedBooks.sort((a, b) => b.judul.localeCompare(a.judul));
    } else if (sortOrder === "pengarang-asc") {
      updatedBooks.sort((a, b) => a.pengarang.localeCompare(b.pengarang));
    }

    setFilteredBooks(updatedBooks);
  };

  // Update buku yang difilter saat `search` atau `sortOrder` berubah
  useEffect(() => {
    updateFilteredBooks();
  }, [search, sortOrder, books]);

  return (
    <CartContext.Provider
      value={{
        fav,
        setFavorit,
        filteredBooks,
        setSearch,
        setSortOrder,
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </CartContext.Provider>
  );
}
