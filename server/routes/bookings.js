import express from 'express';
import { readDB, writeDB } from '../utils/db.js';
import authMiddleware from '../middleware/auth.js';
import moviesData from '../data/movies.js';

const router = express.Router();

// POST /api/bookings — Create a booking (protected)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { movieId, seats, date, time, total } = req.body;
    const userId = req.user.id;

    if (!movieId || !seats || !date || !time || seats.length === 0) {
      return res.status(400).json({ message: 'Missing required booking data.' });
    }

    const db = readDB();

    // Check if any selected seat is already booked for this showtime
    const showtimeKey = `${movieId}_${date}_${time}`;
    const existingBooked = db.showtimes[showtimeKey] || [];
    const conflict = seats.find((seat) => existingBooked.includes(seat.id));

    if (conflict) {
      return res.status(409).json({
        message: `Seat ${conflict.id} was just booked by someone else. Please choose different seats.`,
      });
    }

    // Generate booking ID
    const bookingId = 'MB' + Date.now().toString().slice(-6);

    // Find movie title
    const movie = moviesData.find((m) => m.id === Number(movieId));
    const movieTitle = movie ? movie.title : 'Unknown Movie';
    const moviePoster = movie ? movie.poster : '';

    // Create booking record
    const booking = {
      id: bookingId,
      userId,
      movieId: Number(movieId),
      movieTitle,
      moviePoster,
      seats,
      date,
      time,
      total,
      bookedAt: new Date().toISOString(),
    };

    db.bookings.push(booking);

    // Lock seats in showtime
    db.showtimes[showtimeKey] = [
      ...existingBooked,
      ...seats.map((s) => s.id),
    ];

    writeDB(db);

    res.status(201).json({
      message: 'Booking confirmed!',
      booking,
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET /api/bookings/my — Get logged-in user's bookings (protected)
router.get('/my', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const db = readDB();

    const myBookings = db.bookings
      .filter((b) => b.userId === userId)
      .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt)); // Newest first

    res.json(myBookings);
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
