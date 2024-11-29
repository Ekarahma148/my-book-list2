import { useContext, useState } from "react";
import { CartContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { Bookmark, User2, Home } from "lucide-react";
import { Search } from "lucide-react";

export default function Header() {
  const { fav, handleSearch, handleSort } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          My Book List
        </Link>
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <Link to="/">
              <Home />
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/favorites">
              <Bookmark />
              {fav.length}
            </Link>
          </li>
          <li>
            <Link to="/profil">
              <User2 />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header-right">
        <div className="search-container">
          {searchVisible ? (
            <div className="search-form">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {
                  handleSearch(searchTerm);
                  toggleSearch();
                }}
              >
                Cari
              </button>
            </div>
          ) : (
            <button className="search-toggle" onClick={toggleSearch}>
              <Search />
            </button>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
