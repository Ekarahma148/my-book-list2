import { useContext } from "react";
import { CartContext } from "../App";

function Favorites() {
  const { fav } = useContext(CartContext);

  return (
    <div className="container-page">
      <h1 className="title">Daftar Favorit</h1>
      <div className="book-container">
      {fav.length > 0 ? (
        fav.map((p) => (
          <div key={p.id} className="book-card">
            <p>{p.judul}</p>
            <img src={p.image} alt={p.judul} />
          </div>
        ))
      ) : (
        <h2>Tidak ada buku favorit.</h2>
      )}
      </div>
    </div>
  );
}

export default Favorites;
