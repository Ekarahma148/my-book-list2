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
  const [sortOption, setSortOption] = useState("id");

  // Simpan favorit ke LocalStorage
  useEffect(() => {
    if (Array.isArray(fav)) {
        localStorage.setItem("favorites", JSON.stringify(fav)); // Simpan ke LocalStorage
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

  // Fungsi pencarian
  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.judul.toLowerCase().includes(lowerCaseTerm) ||
        book.pengarang.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredBooks(filtered);
  };

  // Fungsi pengurutan
  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...filteredBooks].sort((a, b) => {
      if (a[option] < b[option]) return -1;
      if (a[option] > b[option]) return 1;
      return 0;
    });
    setFilteredBooks(sorted);
  };

  return (
    <CartContext.Provider
      value={{
        fav,
        setFavorit,
        books,
        filteredBooks,
        handleSearch,
        handleSort,
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </CartContext.Provider>
  );
}
