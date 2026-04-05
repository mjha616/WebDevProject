import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Split movies
  const nowShowing = movies.filter(m => m.status === "now");
  const upcoming = movies.filter(m => m.status === "upcoming");

  return (
    <div>

      {/* HERO */}
      <section className="hero">
        <h1>🎬 Book Your Favorite Movies</h1>
        <p>Discover the latest releases and book your seats instantly.</p>

        <button
          className="btn"
          onClick={() => navigate('/movies')}
        >
          Browse Movies
        </button>
      </section>

      {/* LOADING */}
      {loading && <p className="info-text">Loading movies...</p>}

      {/* ERROR */}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <>
          {/* NOW SHOWING */}
          <section className="container">
            <div className="section-header">
              <h2>🔥 Now Showing</h2>
              <span onClick={() => navigate('/movies')}>See All</span>
            </div>

            <div className="movie-grid">
              {nowShowing.slice(0, 8).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* UPCOMING */}
          <section className="container">
            <div className="section-header">
              <h2>⏳ Coming Soon</h2>
            </div>

            <div className="movie-grid">
              {upcoming.slice(0, 8).map(movie => (
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