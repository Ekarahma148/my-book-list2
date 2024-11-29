import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      alert("Username sudah terdaftar!");
      return;
    }

    // Simpan data pengguna baru
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil!");
    navigate("/login"); // Arahkan ke login setelah berhasil registrasi
  };

  return (
    <div className="form-container">
      <h2 className="title-login">Register</h2>
      <form onSubmit={handleRegister} className="form">
        <input
          type="text"
          className="form-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
