import React, { useEffect, useContext, useState, useRef, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../services/api';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    movieId,
    movieTitle = 'Your Movie',
    moviePoster = '',
    selectedSeats = [],
    total = 0,
    selectedDate = '',
    selectedTime = '',
  } = location.state || {};

  const [bookingId, setBookingId] = useState('');
  const [bookingStatus, setBookingStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [bookingError, setBookingError] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const hasSaved = useRef(false);

  useEffect(() => {
    if (selectedSeats.length === 0 || hasSaved.current) return;
    hasSaved.current = true;

    // Save booking to server
    createBooking({ movieId, seats: selectedSeats, date: selectedDate, time: selectedTime, total })
      .then((data) => {
        setBookingId(data.booking.id);
        setBookingStatus('success');

        // Send email via EmailJS
        const serviceId = 'service_y7964cb';
        const templateId = 'template_cb0gu99';
        const publicKey = 'f6H6oLRQiYgN-fdCe';

        if (user?.email && serviceId !== 'YOUR_SERVICE_ID') {
          const templateParams = {
            to_email: user.email,
            name: user.name || user.email.split('@')[0],
            time: `${selectedDate} | ${selectedTime}`,
            message: `Your booking (ID: ${data.booking.id}) is confirmed! 🍿 Movie: ${movieTitle}. Seats: ${selectedSeats.map((s) => s.id).join(', ')}. Total Paid: ₹${total}.`,
          };

          emailjs
            .send(serviceId, templateId, templateParams, { publicKey })
            .then(() => setEmailStatus('Confirmation email sent! 📩'))
            .catch(() => setEmailStatus('Booking confirmed! (Email sending skipped)'));
        }
      })
      .catch((err) => {
        setBookingStatus('error');
        setBookingError(err.message || 'Booking failed. Please try again.');
      });
  }, []);

  // No booking data
  if (selectedSeats.length === 0) {
    return (
      <section className="center-page">
        <div className="empty-state">
          <div className="empty-icon">🎭</div>
          <h2>No Booking Found</h2>
          <p>It looks like you haven't selected any seats yet.</p>
          <Link to="/movies" className="btn">Browse Movies</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="center-page">
      <div className="confirmation-card">

        {bookingStatus === 'loading' && (
          <div className="booking-processing">
            <div className="processing-spinner" />
            <p>Confirming your booking...</p>
          </div>
        )}

        {bookingStatus === 'error' && (
          <div className="booking-error-state">
            <div className="error-icon">✗</div>
            <h2>Booking Failed</h2>
            <p>{bookingError}</p>
            <button className="btn" onClick={() => navigate(-1)}>Try Again</button>
          </div>
        )}

        {bookingStatus === 'success' && (
          <>
            {/* SUCCESS */}
            <div className="success-badge">
              <div className="success-checkmark">✓</div>
            </div>

            <h2 className="confirm-title">Booking Confirmed!</h2>
            <p className="confirm-subtitle">Enjoy your movie, {user?.name?.split(' ')[0] || 'friend'}! 🎬</p>

            {/* MOVIE POSTER THUMBNAIL */}
            {moviePoster && (
              <img src={moviePoster} alt={movieTitle} className="confirm-poster" />
            )}

            {/* TICKET DETAILS */}
            <div className="ticket-card">
              <div className="ticket-row">
                <span>🎬 Movie</span>
                <strong>{movieTitle}</strong>
              </div>
              <div className="ticket-divider" />
              <div className="ticket-row">
                <span>🔖 Booking ID</span>
                <strong className="booking-id">{bookingId}</strong>
              </div>
              <div className="ticket-row">
                <span>📅 Date & Time</span>
                <strong>{selectedDate} | {selectedTime}</strong>
              </div>
              <div className="ticket-row">
                <span>💺 Seats</span>
                <strong>{selectedSeats.map((s) => s.id).join(', ')}</strong>
              </div>
              <div className="ticket-row">
                <span>🎫 Tickets</span>
                <strong>{selectedSeats.length}</strong>
              </div>
              <div className="ticket-divider" />
              <div className="ticket-row ticket-total">
                <span>💳 Total Paid</span>
                <strong className="total-paid">₹{total}</strong>
              </div>
            </div>

            {emailStatus && (
              <p className="email-status">{emailStatus}</p>
            )}

            {/* ACTIONS */}
            <div className="confirm-actions">
              <Link to="/my-bookings" className="btn btn-outline">My Tickets</Link>
              <Link to="/" className="btn">Back to Home</Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default Confirmation;