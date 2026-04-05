import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { useLocation } from 'react-router-dom';

const Movies = () => {
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');

  // 🔥 Read search from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');

    if (query) {
      setSearch(query);
    } else {
      setSearch('');
    }
  }, [location.search]);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // 🔍 Search filter
  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredMovies(filtered);
  }, [search, movies]);

  // Split sections
  const nowShowing = filteredMovies.filter(m => m.status === "now");
  const upcoming = filteredMovies.filter(m => m.status === "upcoming");

  return (
    <section className="container">

      {/* HEADER */}
      <div className="movies-header">
        <h2>🎬 Movies</h2>

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* LOADING */}
      {loading && <p className="info-text">Loading movies...</p>}

      {/* ERROR */}
      {error && <p className="error-text">{error}</p>}

      {/* EMPTY */}
      {!loading && filteredMovies.length === 0 && (
        <p className="info-text">No movies found 🎭</p>
      )}

      {!loading && !error && filteredMovies.length > 0 && (
        <>
          {/* NOW SHOWING */}
          {nowShowing.length > 0 && (
            <>
              <h3 className="section-title">🔥 Now Showing</h3>
              <div className="movie-grid">
                {nowShowing.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}

          {/* UPCOMING */}
          {upcoming.length > 0 && (
            <>
              <h3 className="section-title">⏳ Coming Soon</h3>
              <div className="movie-grid">
                {upcoming.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </>
      )}

    </section>
  );
};

export default Movies;