import React, { useEffect, useState } from 'react';
import { getMovieById } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // LOADING
  if (loading) {
    return <div className="container info-text">Loading movie...</div>;
  }

  // ERROR
  if (error || !movie) {
    return <div className="container error-text">{error || "Movie not found"}</div>;
  }

  return (
    <section className="container">

      {/* 🔥 DYNAMIC APPLE MUSIC STYLE BACKGROUND */}
      {movie && (
        <div 
          className="details-page-backdrop" 
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
      )}

      {/* HERO SECTION */}
      <div className="details-hero">
        <img
          src={movie.poster}
          alt={movie.title}
          className="details-poster"
        />

        <div className="details-content">
          <h1>{movie.title}</h1>

          <p className="movie-meta">
            ⭐ {movie.rating} • {movie.duration} • {movie.genre}
          </p>

          <p className="movie-cast">
            <strong>Cast:</strong> {movie.cast?.join(', ') || "N/A"}
          </p>

          <p className="movie-desc">
            {movie.description}
          </p>

          {/* 🔥 STATUS BADGE */}
          {movie.status === "upcoming" && (
            <p style={{ color: "orange", marginBottom: "1rem" }}>
              ⏳ Coming Soon
            </p>
          )}

          {/* 🎟️ BOOK BUTTON LOGIC */}
          {movie.status === "now" ? (
            <button
              className="btn"
              onClick={() => navigate(`/book/${movie.id}`)}
            >
              🎟️ Book Tickets
            </button>
          ) : (
            <button className="btn disabled-btn" disabled>
              ⏳ Coming Soon
            </button>
          )}

        </div>
      </div>

      {/* 🎬 TRAILER */}
      {movie.trailer && (
        <div className="trailer-section">
          <h3>Watch Trailer 🎬</h3>
          <iframe
            src={movie.trailer}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

    </section>
  );
};

export default MovieDetails;