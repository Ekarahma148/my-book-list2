import { useContext, useState} from "react";
import { CartContext } from "../App";
import { Heart, Bookmark, InfoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { filteredBooks, fav, setFavorit } = useContext(CartContext);
  const [liked, setLiked] = useState(() => {
    const savedLikes = localStorage.getItem("likedBooks");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const navigate = useNavigate();

  const handleLike = (id) => {
    const updatedLikes = { ...liked, [id]: !liked[id] };
    setLiked(updatedLikes);
    localStorage.setItem("likedBooks", JSON.stringify(updatedLikes));
  };

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
      <h1>Book List</h1>
      <div className="book-container">
        {filteredBooks.map((book) => (
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
              <InfoIcon
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
    </div>
  );
}

export default Home;
