import React, { useEffect, useState } from 'react';
import { getMovies, getNowShowing, getUpcoming } from '../services/api';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { icon: '🎬', value: '10+', label: 'Movies' },
  { icon: '🏟️', value: '50+', label: 'Screens' },
  { icon: '🎫', value: '1M+', label: 'Tickets Sold' },
  { icon: '⭐', value: '4.8', label: 'Avg Rating' },
];

const Home = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [now, soon] = await Promise.all([getNowShowing(), getUpcoming()]);
        setNowShowing(now);
        setUpcoming(soon);
      } catch {
        setError('Failed to load movies. Is the server running?');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🔴 Live Booking</div>
          <h1 className="hero-title">
            Your Seat,<br />
            <span className="hero-gradient">Your Story.</span>
          </h1>
          <p className="hero-desc">
            Real-time seat availability. Instant confirmation. No fuss.
          </p>
          <div className="hero-actions">
            <button className="btn btn-hero" onClick={() => navigate('/movies')}>
              Browse Movies
            </button>
            <button className="btn btn-outline-hero" onClick={() => navigate('/movies')}>
              Coming Soon ›
            </button>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="stats-bar">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* USP BANNER */}
      <section className="usp-section">
        <div className="usp-card">
          <span className="usp-pulse" />
          <div>
            <h3>🔴 Real-Time Seat Intelligence</h3>
            <p>Our USP: seat availability is server-synced. Book a seat and it's instantly locked — no double-bookings, ever.</p>
          </div>
        </div>
      </section>

      {/* LOADING SKELETON */}
      {loading && (
        <section className="container">
          <div className="movie-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="movie-card-skeleton">
                <div className="skeleton skeleton-poster" />
                <div className="skeleton-info">
                  <div className="skeleton skeleton-line long" />
                  <div className="skeleton skeleton-line short" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {error && <p className="error-text center-text">{error}</p>}

      {!loading && !error && (
        <>
          {/* NOW SHOWING */}
          <section className="container">
            <div className="section-header">
              <div className="section-heading">
                <span className="section-dot now" />
                <h2>Now Showing</h2>
              </div>
              <span className="see-all" onClick={() => navigate('/movies')}>See All →</span>
            </div>
            <div className="movie-grid">
              {nowShowing.slice(0, 8).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* UPCOMING */}
          <section className="container">
            <div className="section-header">
              <div className="section-heading">
                <span className="section-dot upcoming" />
                <h2>Coming Soon</h2>
              </div>
            </div>
            <div className="movie-grid">
              {upcoming.slice(0, 8).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
};

export default Home;