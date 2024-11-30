import { useContext, useState } from "react";
import { CartContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { Bookmark, User2, Home, Search } from "lucide-react";
import { Newspaper } from "lucide-react";

export default function Header() {
  const { fav, setSearch, setSortOrder } = useContext(CartContext);
  const [searchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();

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
            <Link to="/about"><Newspaper/></Link>
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
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={toggleSearch}>Cari</button>
            </div>
          ) : (
            <button className="search-toggle" onClick={toggleSearch}>
              <Search />
            </button>
          )}
          <select
            className="sort-select"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="id-asc">ID</option>
            <option value="judul-asc">Asc</option>
            <option value="judul-desc">Desc</option>
            <option value="pengarang-asc">Author</option>
          </select>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
