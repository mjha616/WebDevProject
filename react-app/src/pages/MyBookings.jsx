import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getMyBookings } from '../services/api';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    getMyBookings()
      .then(setBookings)
      .catch((err) => setError(err.message || 'Failed to load bookings'))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) return null;

  return (
    <section className="mybookings-page">

      {/* HEADER */}
      <div className="mybookings-header">
        <div>
          <h1>🎫 My Tickets</h1>
          <p>Your complete booking history, all in one place.</p>
        </div>
        <Link to="/movies" className="btn">Book More Tickets</Link>
      </div>

      {/* LOADING SKELETON */}
      {loading && (
        <div className="bookings-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="booking-card-skeleton">
              <div className="skeleton skeleton-img" />
              <div className="skeleton-body">
                <div className="skeleton skeleton-line long" />
                <div className="skeleton skeleton-line short" />
                <div className="skeleton skeleton-line medium" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="empty-state">
          <div className="empty-icon">😕</div>
          <h3>Couldn't load bookings</h3>
          <p>{error}</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && bookings.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🎭</div>
          <h3>No tickets yet</h3>
          <p>Your booked tickets will appear here. Start by browsing movies!</p>
          <Link to="/movies" className="btn" style={{ marginTop: '1rem' }}>Browse Movies</Link>
        </div>
      )}

      {/* BOOKINGS GRID */}
      {!loading && !error && bookings.length > 0 && (
        <>
          <p className="bookings-count">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} found</p>
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-entry-card">

                {/* POSTER */}
                <div className="booking-card-poster">
                  {booking.moviePoster ? (
                    <img src={booking.moviePoster} alt={booking.movieTitle} loading="lazy" />
                  ) : (
                    <div className="poster-placeholder">🎬</div>
                  )}
                  <div className="booking-status-badge">Confirmed ✓</div>
                </div>

                {/* INFO */}
                <div className="booking-card-info">
                  <h3 className="booking-movie-title">{booking.movieTitle}</h3>

                  <div className="booking-meta">
                    <div className="meta-row">
                      <span className="meta-label">🔖 Booking ID</span>
                      <span className="meta-value booking-id-text">{booking.id}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">📅 Date</span>
                      <span className="meta-value">{booking.date}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">🕐 Time</span>
                      <span className="meta-value">{booking.time}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">💺 Seats</span>
                      <span className="meta-value seats-list">{booking.seats.map((s) => s.id).join(', ')}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">🎫 Tickets</span>
                      <span className="meta-value">{booking.seats.length}</span>
                    </div>
                  </div>

                  <div className="booking-card-footer">
                    <span className="booking-total">₹{booking.total}</span>
                    <span className="booking-date-label">
                      Booked on {new Date(booking.bookedAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </>
      )}

    </section>
  );
};

export default MyBookings;
