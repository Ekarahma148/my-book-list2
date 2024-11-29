import { useContext } from "react";
import { CartContext } from "../App";

function Favorites() {
  const { fav } = useContext(CartContext);

  return (
    <div className="container-page">
      <h1 className="title">Daftar Favorit</h1>
      {fav.length > 0 ? (
        fav.map((p) => (
          <div key={p.id} className="book-card">
            <p>{p.judul}</p>
            <img src={p.image} alt={p.judul} />
          </div>
        ))
      ) : (
        <p>Tidak ada buku favorit.</p>
      )}
    </div>
  );
}

export default Favorites;
