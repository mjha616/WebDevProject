import express from 'express';
import { readDB } from '../utils/db.js';

const router = express.Router();

// GET /api/showtimes/:movieId/:date/:time/seats
// Returns array of booked seat IDs for the given showtime
router.get('/:movieId/:date/:time/seats', (req, res) => {
  try {
    const { movieId, date, time } = req.params;

    // Decode URI components (date/time may have spaces/colons)
    const decodedDate = decodeURIComponent(date);
    const decodedTime = decodeURIComponent(time);

    const showtimeKey = `${movieId}_${decodedDate}_${decodedTime}`;
    const db = readDB();

    const bookedSeats = db.showtimes[showtimeKey] || [];

    res.json({ showtimeKey, bookedSeats });
  } catch (err) {
    console.error('Showtime error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
