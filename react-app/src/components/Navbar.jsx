import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  // Handle search submit
  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim() !== '') {
      navigate(`/movies?search=${encodeURIComponent(search)}`);
      setSearch(''); // optional: clear after search
    }
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        🎬 MovieTicket
      </Link>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search movies..."
        className="nav-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />

      {/* LINKS */}
      <div className="nav-links">

        <Link
          to="/movies"
          className={location.pathname === "/movies" ? "active-link" : ""}
        >
          Movies
        </Link>

        <Link
          to="/login"
          className={location.pathname === "/login" ? "btn active-btn" : "btn"}
        >
          Login
        </Link>

        <Link
          to="/signup"
          className={location.pathname === "/signup" ? "btn active-btn" : "btn"}
        >
          Sign Up
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;