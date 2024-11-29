import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    // Jika belum ada pengguna terdaftar, arahkan ke halaman registrasi
    return <Navigate to="/register" />;
  }

  if (!isLoggedIn) {
    // Jika belum login, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika semua validasi lolos, tampilkan halaman anak
  return children;
}
