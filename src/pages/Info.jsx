import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Info() {
  const { id } = useParams(); // Mengambil ID buku dari URL
  const savedBooks = JSON.parse(localStorage.getItem("book")) || [];
  const [book, setBook] = useState(null);

  useEffect(() => {
    const foundBook = savedBooks.find((b) => b.id === parseInt(id));
    if (foundBook) setBook(foundBook);
  }, [id, savedBooks]);

  if (!book) return <p>Data buku tidak ditemukan.</p>;

  return (
    <div>
      <h1 className="title">Detail Buku</h1>
    <div className="book-container">
      <div className="book-cardd">
      <img src={book.image} alt={book.judul} style={{ width: "200px" }} />
      <div className="book-details">
      <p><b>Judul:</b> {book.judul}</p>
      <p><b>Pengarang:</b> {book.pengarang}</p>
      <p><b>Penerbit:</b> {book.penerbit}</p>
      <p><b>Tahun Terbit:</b> {book.Tahun_terbit}</p>
      <p><b>Halaman:</b> {book.Halaman}</p>
      <p><b>Sinopsis:</b> {book.sinopsis}</p>
    </div>
      </div>
      </div>
    </div>
  );
}

export default Info;
