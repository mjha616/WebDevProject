import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatGrid from '../components/SeatGrid';
import { AuthContext } from '../context/AuthContext';
import { getMovieById, getShowtimeSeats } from '../services/api';

// Generate dynamic dates (Next 5 days)
const generateDates = () => {
  const dates = [];
  const options = { weekday: 'short', month: 'short', day: 'numeric' };

  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    let label = d.toLocaleDateString('en-US', options);
    if (i === 0) label = 'Today, ' + d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    if (i === 1) label = 'Tomorrow, ' + d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    dates.push(label);
  }
  return dates;
};

const TIME_SLOTS = ['10:30 AM', '01:15 PM', '04:30 PM', '08:00 PM'];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [movieLoading, setMovieLoading] = useState(true);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableDates] = useState(generateDates());

  // ── Seat data from server ─────────────────────────────────────────────────
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatsLoading, setSeatsLoading] = useState(false);

  // ── Payment state ─────────────────────────────────────────────────────────
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Fetch movie details
  useEffect(() => {
    getMovieById(id)
      .then(setMovie)
      .catch(() => {})
      .finally(() => setMovieLoading(false));
  }, [id]);

  // Fetch booked seats from server whenever date+time change
  useEffect(() => {
    if (!selectedDate || !selectedTime) return;
    setSeatsLoading(true);
    setSelectedSeats([]); // Reset seats when showtime changes

    getShowtimeSeats(id, selectedDate, selectedTime)
      .then((data) => setBookedSeats(data.bookedSeats || []))
      .catch(() => setBookedSeats([]))
      .finally(() => setSeatsLoading(false));
  }, [id, selectedDate, selectedTime]);

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and a time slot.');
      return;
    }
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    setShowPaymentModal(true);
  };

  const processPayment = (e) => {
    e.preventDefault();
    setIsPaying(true);
    // Fake payment processing delay
    setTimeout(() => {
      navigate('/confirmation', {
        state: {
          movieId: id,
          movieTitle: movie?.title || 'Movie',
          moviePoster: movie?.poster || '',
          selectedSeats,
          total,
          selectedDate,
          selectedTime,
        },
      });
    }, 2000);
  };

  return (
    <section className="booking-page">

      {/* HEADER */}
      <div className="booking-header">
        {movieLoading ? (
          <div className="skeleton-title" />
        ) : (
          <>
            <h2>🎟️ {movie?.title || 'Book Your Tickets'}</h2>
            <p className="booking-subtitle">Choose your preferred date, time & seats</p>
          </>
        )}
      </div>

      {/* DATE & TIME SELECTION */}
      <div className="datetime-selection">
        <h3>📅 Select Date</h3>
        <div className="chip-container">
          {availableDates.map((date) => (
            <button
              key={date}
              id={`date-${date.replace(/\s/g, '-')}`}
              className={`chip ${selectedDate === date ? 'active' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>

        <h3>🕐 Select Time</h3>
        <div className="chip-container">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              id={`time-${time.replace(/\s/g, '-')}`}
              className={`chip ${selectedTime === time ? 'active' : ''}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* SEAT AVAILABILITY NOTICE */}
      {selectedDate && selectedTime && (
        <div className="availability-notice">
          {seatsLoading ? (
            <span className="seats-loading">⟳ Loading real-time seat availability...</span>
          ) : (
            <span className="seats-live">
              🔴 Live seat data — {bookedSeats.length} seat{bookedSeats.length !== 1 ? 's' : ''} already booked for this showtime
            </span>
          )}
        </div>
      )}

      {/* SCREEN */}
      <div className="screen-wrapper">
        <div className="screen-bar" />
        <p className="screen-text">All eyes this way 👀</p>
      </div>

      {/* SEAT GRID */}
      {(!selectedDate || !selectedTime) ? (
        <div className="select-showtime-hint">
          <p>👆 Please select a date and time to view seat availability</p>
        </div>
      ) : (
        <SeatGrid
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          bookedSeats={bookedSeats}
          disabled={seatsLoading}
        />
      )}

      {/* BOOKING SUMMARY */}
      <div className="booking-summary">
        <div className="summary-row">
          <span>Selected Seats:</span>
          <strong>
            {selectedSeats.length > 0
              ? selectedSeats.map((s) => s.id).join(', ')
              : 'None'}
          </strong>
        </div>
        <div className="summary-row">
          <span>Tickets:</span>
          <strong>{selectedSeats.length}</strong>
        </div>
        <div className="summary-row total-row">
          <span>Total Amount:</span>
          <strong className="total-amount">₹{total}</strong>
        </div>

        <button
          className="btn btn-full btn-book"
          id="proceed-to-pay"
          onClick={handleBooking}
          disabled={seatsLoading}
        >
          {user ? 'Proceed to Pay →' : '🔐 Login to Book'}
        </button>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <button className="close-btn" onClick={() => !isPaying && setShowPaymentModal(false)}>✕</button>
            <h2>Secure Payment 💳</h2>
            <p>Total amount to pay: <strong className="total-amount">₹{total}</strong></p>
            
            <form onSubmit={processPayment} className="payment-form">
              <div className="input-group">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" required pattern=".{16,}" title="16 digit card number" disabled={isPaying} />
              </div>
              <div className="payment-row">
                <div className="input-group">
                  <label>Expiry (MM/YY)</label>
                  <input type="text" placeholder="12/25" required disabled={isPaying} />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input type="password" placeholder="123" required pattern=".{3}" title="3 digit CVV" disabled={isPaying} />
                </div>
              </div>
              <div className="input-group">
                <label>Name on Card</label>
                <input type="text" placeholder="John Doe" required disabled={isPaying} />
              </div>
              <button 
                type="submit" 
                className="btn btn-full payment-submit-btn"
                disabled={isPaying}
              >
                {isPaying ? 'Processing Payment...' : `Pay ₹${total}`}
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default Booking;