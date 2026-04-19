import React, { useEffect, useState } from 'react';
import { getMovieById } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const GENRE_COLORS = {
  Action: '#ef4444',
  'Sci-Fi': '#6366f1',
  Horror: '#8b5cf6',
  Drama: '#f59e0b',
  Adventure: '#10b981',
  Romance: '#ec4899',
  Animation: '#14b8a6',
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMovieById(id)
      .then(setMovie)
      .catch(() => setError('Failed to load movie details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="details-skeleton">
          <div className="skeleton skeleton-poster-lg" />
          <div className="skeleton-body">
            <div className="skeleton skeleton-line long" />
            <div className="skeleton skeleton-line medium" />
            <div className="skeleton skeleton-line short" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="center-page">
        <div className="empty-state">
          <div className="empty-icon">😕</div>
          <h3>{error || 'Movie not found'}</h3>
          <button className="btn" onClick={() => navigate('/movies')}>Back to Movies</button>
        </div>
      </div>
    );
  }

  const genreColor = GENRE_COLORS[movie.genre] || '#f84464';

  return (
    <section className="details-page">

      {/* BLURRED BACKDROP */}
      <div
        className="details-backdrop"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />

      <div className="container">
        <div className="details-hero">

          {/* POSTER */}
          <div className="details-poster-wrap">
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.title}
              className="details-poster"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
            {movie.status === 'now' && (
              <div className="now-playing-badge">🔴 Now Playing</div>
            )}
          </div>

          {/* INFO */}
          <div className="details-info">

            {/* GENRE BADGE */}
            <span
              className="genre-badge-detail"
              style={{ background: genreColor + '22', color: genreColor, border: `1px solid ${genreColor}55` }}
            >
              {movie.genre}
            </span>

            <h1 className="details-title">{movie.title}</h1>

            <div className="details-meta">
              {movie.rating && (
                <span className="meta-chip rating-chip">⭐ {movie.rating}</span>
              )}
              <span className="meta-chip">{movie.duration}</span>
              <span className="meta-chip">{movie.language}</span>
            </div>

            <p className="details-description">{movie.description}</p>

            {movie.cast?.length > 0 && (
              <div className="details-cast">
                <h4>Cast</h4>
                <div className="cast-list">
                  {movie.cast.map((actor) => (
                    <span key={actor} className="cast-chip">{actor}</span>
                  ))}
                </div>
              </div>
            )}

            {/* BOOKING ACTIONS */}
            <div className="details-actions">
              {movie.status === 'now' ? (
                <button
                  className="btn btn-book"
                  id={`book-${movie.id}`}
                  onClick={() => navigate(`/book/${movie.id}`)}
                >
                  🎟️ Book Tickets
                </button>
              ) : (
                <button className="btn btn-coming-soon" disabled>
                  ⏳ Coming Soon
                </button>
              )}
              <button className="btn btn-outline" onClick={() => navigate('/movies')}>
                ← Back
              </button>
            </div>

          </div>
        </div>

        {/* TRAILER */}
        {movie.trailer && (
          <div className="trailer-section">
            <h3>Official Trailer 🎬</h3>
            <iframe
              src={movie.trailer}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
      </div>

    </section>
  );
};

export default MovieDetails;