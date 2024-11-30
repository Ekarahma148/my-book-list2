import { useContext, useState } from "react";
import { CartContext } from "../App";
import { Heart, Bookmark, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { filteredBooks, fav, setFavorit } = useContext(CartContext);
  const [liked, setLiked] = useState(() => {
    const savedLikes = localStorage.getItem("likedBooks");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Validasi Data untuk Pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fungsi Like
  const handleLike = (id) => {
    const updatedLikes = { ...liked, [id]: !liked[id] };
    setLiked(updatedLikes);
    localStorage.setItem("likedBooks", JSON.stringify(updatedLikes));
  };

  // Fungsi Favorit
  const handleFav = (id) => {
    if (fav.some((item) => item.id === id)) {
      // Hapus dari daftar favorit
      setFavorit(fav.filter((item) => item.id !== id));
    } else {
      // Tambahkan ke daftar favorit
      const bookToAdd = filteredBooks.find((book) => book.id === id);
      if (bookToAdd) {
        setFavorit([...fav, bookToAdd]);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Book List</h1>
      <div className="book-container">
        {currentItems.map((book) => (
          <div key={book.id} className="book-card">
            <p>{book.judul}</p>
            <img src={book.image} alt={book.judul} />
            <div className="icons">
              <Heart
                onClick={() => handleLike(book.id)}
                style={{
                  fill: liked[book.id] ? "red" : "white",
                  cursor: "pointer",
                }}
              />
              <Info
                onClick={() => navigate(`/info/${book.id}`)}
                style={{ cursor: "pointer" }}
              />
              <Bookmark
                onClick={() => handleFav(book.id)}
                style={{
                  fill: fav.some((item) => item.id === book.id)
                    ? "yellow"
                    : "white",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pages">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
           {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
