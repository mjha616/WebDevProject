import express from 'express';
import moviesData from '../data/movies.js';

const router = express.Router();

// Normalize movie data
const normalizeMovie = (movie) => ({
  ...movie,
  rating: movie.rating ?? null,
  duration: movie.duration || 'TBA',
  cast: movie.cast || [],
});

// GET /api/movies — All movies with optional search & genre filter
router.get('/', (req, res) => {
  const { search, genre, status } = req.query;

  let movies = moviesData.map(normalizeMovie);

  if (search) {
    const q = search.toLowerCase();
    movies = movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q) ||
        m.cast.some((c) => c.toLowerCase().includes(q))
    );
  }

  if (genre && genre !== 'All') {
    movies = movies.filter((m) =>
      m.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (status) {
    movies = movies.filter((m) => m.status === status);
  }

  res.json(movies);
});

// GET /api/movies/now-showing
router.get('/now-showing', (req, res) => {
  const movies = moviesData
    .filter((m) => m.status === 'now')
    .map(normalizeMovie);
  res.json(movies);
});

// GET /api/movies/upcoming
router.get('/upcoming', (req, res) => {
  const movies = moviesData
    .filter((m) => m.status === 'upcoming')
    .map(normalizeMovie);
  res.json(movies);
});

// GET /api/movies/genres — Get all unique genres
router.get('/genres', (req, res) => {
  const genres = [...new Set(moviesData.map((m) => m.genre))];
  res.json(['All', ...genres]);
});

// GET /api/movies/:id — Single movie by ID
router.get('/:id', (req, res) => {
  const movie = moviesData.find((m) => m.id === Number(req.params.id));
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.json(normalizeMovie(movie));
});

export default router;
