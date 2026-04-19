import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/movies?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" id="main-navbar">

      {/* LOGO */}
      <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <span className="logo-icon">🎬</span>
        <span className="logo-text">MovieTicket</span>
      </Link>

      {/* SEARCH */}
      <div className="nav-search-wrap">
        <span className="nav-search-icon">🔍</span>
        <input
          type="text"
          id="navbar-search"
          placeholder="Search movies..."
          className="nav-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          aria-label="Search movies"
        />
      </div>

      {/* HAMBURGER */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        id="hamburger-btn"
      >
        <span />
        <span />
        <span />
      </button>

      {/* NAV LINKS */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link
          to="/movies"
          className={`nav-link ${isActive('/movies') ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Movies
        </Link>

        {user ? (
          <>
            <Link
              to="/my-bookings"
              className={`nav-link ${isActive('/my-bookings') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              My Tickets
            </Link>

            <div className="nav-user">
              <span className="nav-greeting">
                👤 {user.name?.split(' ')[0] || user.email.split('@')[0]}
              </span>
              <button
                className="btn btn-sm btn-outline-nav"
                id="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="nav-auth">
            <Link
              to="/login"
              className={`btn btn-sm btn-ghost ${isActive('/login') ? 'active' : ''}`}
              id="nav-login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-sm"
              id="nav-signup"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;