import  { useState, useEffect } from "react";

export default function Footer() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    // Tambahkan kelas ke elemen body
    document.body.classList.add(`${savedTheme}-theme`);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Ganti kelas di elemen body
    document.body.classList.remove(`${theme}-theme`);
    document.body.classList.add(`${newTheme}-theme`);

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Simpan ke localStorage
  };

  return (
    <div className="footer">
      <h3>© Hak Cipta</h3>
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}
