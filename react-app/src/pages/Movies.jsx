import React, { useEffect, useState } from 'react';
import { getMovies, getGenres } from '../services/api';
import MovieCard from '../components/MovieCard';
import { useLocation } from 'react-router-dom';

const Movies = () => {
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState(['All']);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  // Read search from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) setSearch(query);
    else setSearch('');
  }, [location.search]);

  // Fetch genres
  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => {});
  }, []);

  // Fetch movies
  useEffect(() => {
    setLoading(true);
    getMovies()
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch(() => setError('Failed to load movies'))
      .finally(() => setLoading(false));
  }, []);

  // Client-side filter by search + genre
  useEffect(() => {
    let result = movies;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q)
      );
    }

    if (activeGenre && activeGenre !== 'All') {
      result = result.filter((m) =>
        m.genre.toLowerCase().includes(activeGenre.toLowerCase())
      );
    }

    setFilteredMovies(result);
  }, [search, activeGenre, movies]);

  const nowShowing = filteredMovies.filter((m) => m.status === 'now');
  const upcoming = filteredMovies.filter((m) => m.status === 'upcoming');

  return (
    <section className="movies-page">

      {/* HEADER */}
      <div className="movies-header-bar">
        <div>
          <h1 className="movies-title">🎬 Movies</h1>
          <p className="movies-subtitle">Discover what's playing and what's coming</p>
        </div>

        <div className="movies-search-wrap">
          <span className="search-icon">🔍</span>
          <input
            id="movies-search"
            type="text"
            placeholder="Search by title, genre, cast..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
            aria-label="Search movies"
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      </div>

      {/* GENRE FILTERS */}
      <div className="genre-filter-bar">
        {genres.map((genre) => (
          <button
            key={genre}
            id={`genre-${genre}`}
            className={`genre-chip ${activeGenre === genre ? 'active' : ''}`}
            onClick={() => setActiveGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* LOADING SKELETON */}
      {loading && (
        <div className="movie-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="movie-card-skeleton">
              <div className="skeleton skeleton-poster" />
              <div className="skeleton-info">
                <div className="skeleton skeleton-line long" />
                <div className="skeleton skeleton-line short" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ERROR */}
      {error && <p className="error-text center-text">{error}</p>}

      {/* EMPTY */}
      {!loading && filteredMovies.length === 0 && (
        <div className="empty-state center-text">
          <div className="empty-icon">🎭</div>
          <h3>No movies found</h3>
          <p>Try adjusting your search or genre filter</p>
        </div>
      )}

      {/* RESULTS */}
      {!loading && !error && filteredMovies.length > 0 && (
        <>
          {nowShowing.length > 0 && (
            <div className="movies-section">
              <div className="section-heading">
                <span className="section-dot now" />
                <h2>Now Showing</h2>
                <span className="section-count">{nowShowing.length} films</span>
              </div>
              <div className="movie-grid">
                {nowShowing.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}

          {upcoming.length > 0 && (
            <div className="movies-section">
              <div className="section-heading">
                <span className="section-dot upcoming" />
                <h2>Coming Soon</h2>
                <span className="section-count">{upcoming.length} films</span>
              </div>
              <div className="movie-grid">
                {upcoming.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

    </section>
  );
};

export default Movies;