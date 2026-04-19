import React from 'react';
import { useNavigate } from 'react-router-dom';

const GENRE_COLORS = {
  Action: '#ef4444',
  'Sci-Fi': '#6366f1',
  Horror: '#8b5cf6',
  Drama: '#f59e0b',
  Adventure: '#10b981',
  Romance: '#ec4899',
  Animation: '#14b8a6',
};

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const genreColor = GENRE_COLORS[movie.genre] || '#f84464';

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`View ${movie.title}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/movie/${movie.id}`)}
      id={`movie-card-${movie.id}`}
    >

      {/* POSTER */}
      <div className="movie-image">
        <img
          src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />

        {/* GENRE BADGE */}
        <span
          className="genre-badge"
          style={{ background: genreColor + 'dd' }}
        >
          {movie.genre}
        </span>

        {/* RATING BADGE */}
        {movie.rating && (
          <div className="rating-badge">⭐ {movie.rating}</div>
        )}

        {/* HOVER OVERLAY */}
        <div className="movie-overlay">
          {movie.status === 'now' ? (
            <button
              className="btn btn-sm overlay-btn"
              id={`book-overlay-${movie.id}`}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/book/${movie.id}`);
              }}
            >
              🎟️ Book Now
            </button>
          ) : (
            <span className="coming-soon-badge">⏳ Coming Soon</span>
          )}
        </div>
      </div>

      {/* INFO */}
      <div className="movie-info">
        <h3 title={movie.title}>{movie.title}</h3>
        <p>{movie.language} • {movie.duration}</p>
      </div>

    </div>
  );
};

export default MovieCard;