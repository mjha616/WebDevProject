import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedSeats = [], total = 0, selectedDate = "", selectedTime = "" } = location.state || {};

  // Generate fake booking ID (for demo)
  const bookingId = "MB" + Math.floor(100000 + Math.random() * 900000);

  // If no booking data
  if (selectedSeats.length === 0) {
    return (
      <section className="container center">
        <div className="empty-state">
          <h2>No booking found 😕</h2>
          <p>Please book tickets first.</p>
          <button className="btn" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container center">

      <div className="confirmation-card">

        {/* SUCCESS ICON */}
        <div className="success-icon">✓</div>

        {/* TITLE */}
        <h2>Booking Confirmed!</h2>
        <p className="subtitle">Enjoy your movie 🎬</p>

        {/* DETAILS */}
        <div className="booking-details">

          <p><strong>Booking ID:</strong> {bookingId}</p>

          {selectedDate && selectedTime && (
            <p>
              <strong>Date & Time:</strong> {selectedDate} | {selectedTime}
            </p>
          )}

          <p>
            <strong>Seats:</strong> {selectedSeats.map(seat => seat.id).join(', ')}
          </p>

          <p>
            <strong>Tickets:</strong> {selectedSeats.length}
          </p>

          <p>
            <strong>Total Paid:</strong> ₹{total}
          </p>

        </div>

        {/* NOTE */}
        <p className="note">
          Tickets have been sent to your email 📩
        </p>

        {/* BUTTON */}
        <button className="btn full-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>

      </div>

    </section>
  );
};

export default Confirmation;