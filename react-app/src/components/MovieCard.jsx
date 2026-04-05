import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>

      {/* POSTER */}
      <div className="movie-image">
        <img
          src={movie.poster || "https://via.placeholder.com/300x450"}
          alt={movie.title}
        />

        {/* RATING BADGE */}
        <div className="rating-badge">
          ⭐ {movie.rating || "N/A"}
        </div>

        {/* OVERLAY */}
        <div className="movie-overlay">
          {movie.status === "now" ? (
            <button
              className="btn small-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevent card click
                navigate(`/book/${movie.id}`);
              }}
            >
              🎟️ Book Now
            </button>
          ) : (
            <button 
              className="btn small-btn disabled-btn" 
              disabled
              onClick={(e) => e.stopPropagation()}
            >
              ⏳ Soon
            </button>
          )}
        </div>
      </div>

      {/* INFO */}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>
          {movie.genre || "Genre"} • {movie.language || "Language"}
        </p>
      </div>

    </div>
  );
};

export default MovieCard;