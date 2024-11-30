import { useState, useEffect } from "react";

function Profile() {
  const savedBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
  const [userBooks, setUserBooks] = useState(savedBooks);
  const [formData, setFormData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    localStorage.setItem("userBooks", JSON.stringify(userBooks));
  }, [userBooks]);

  // Fungsi untuk menambah buku baru
  function handleAdd() {
    if (!formData) return; 
    const newId = userBooks.length > 0 ? Math.max(...userBooks.map((b) => b.id)) + 1 : 1;
    setUserBooks([...userBooks, { ...formData, id: newId }]);
    setFormData(null); 
  }
  
  function handleUpdate() {
    setUserBooks(userBooks.map((b) => (b.id === formData.id ? formData : b)));
    setFormData(null); 
    setIsEdit(false);
  }
  
  // Fungsi untuk menghapus buku
  function handleDelete(id) {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      setUserBooks(userBooks.filter((b) => b.id !== id));
    }
  }

  return (
    <div className="container-page">
      <h1 className="title">Halaman Profil</h1>
      {formData && (
        <div
    className="form-container"
    onClick={(e) => {
      if (e.target.className === "form-container") {
        setFormData(null); 
      }
    }}
  >     
     <form
  className="form"
  onSubmit={(e) => {
    e.preventDefault(); 
    isEdit ? handleUpdate() : handleAdd();
  }}
>
          <label>
            Judul Buku:
            <input
              type="text"
              className="form-input"
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              required
              />
          </label>
          <label>
            Pengarang:
            <input
              type="text"
              className="form-input"
              value={formData.pengarang}
              onChange={(e) => setFormData({ ...formData, pengarang: e.target.value })}
              required
              />
          </label>
          <label>
            Sinopsis:
            <input
              type="text"
              className="form-input"
              value={formData.sinopsis}
              onChange={(e) => setFormData({ ...formData, sinopsis: e.target.value })}
              required
              />
          </label>
          <label>
            Tahun Terbit:
            <input
              type="number"
              className="form-input"
              value={formData.tahun}
              onChange={(e) => setFormData({ ...formData, tahun: parseInt(e.target.value) || "" })}
              required
              />
          </label>
          <label>
            Halaman:
            <input
              type="number"
              className="form-input"
              value={formData.halaman}
              onChange={(e) => setFormData({ ...formData, halaman: parseInt(e.target.value) || "" })}
              required
              
              />
          </label>
          <label>
              URL Gambar:
            <input
              type="text"
              className="form-input"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </label>
          <button type="submit">{isEdit ? "Update Buku" : "Tambah Buku"}</button>
          <button type="button" onClick={() => setFormData(null)}>
            Batal
          </button>
        </form>
      </div>
      )}

      <div className="book-container">
        {userBooks.length > 0 ? (
          userBooks.map((b) => (
            <div key={b.id} className="book-cardd">
              <img src={b.image} alt={b.judul} />
              <div className="book-details">
              <p>Judul: {b.judul}</p>
              <p>Pengarang: {b.pengarang}</p>
              <p>Sinopsis: {b.sinopsis}</p>
              <p>Tahun: {b.tahun}</p>
              <p>Halaman: {b.halaman}</p>
              <button
              className="update-button"
                onClick={() => {
                  setFormData(b);
                  setIsEdit(true);
                }}
              >
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(b.id)}>Hapus</button>
              </div>
            </div>
          ))
        ) : (
          <h2>{currentUser?.username} Belum Membuat Buku.</h2>
        )}
      </div>
          <button
           onClick={() => {
             setFormData({ judul: "", pengarang: "", sinopsis: "", tahun: "", halaman: "", image: "" });
             setIsEdit(false);
           }}
         >
           +
         </button>
    </div>
  );
}

export default Profile;
