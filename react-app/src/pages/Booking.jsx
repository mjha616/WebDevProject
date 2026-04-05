import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatGrid from '../components/SeatGrid';

// Generate dynamic dates (Next 5 days)
const generateDates = () => {
  const dates = [];
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  
  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    let label = d.toLocaleDateString('en-US', options);
    // Overwrite the weekday name for today and tomorrow for better UX
    if (i === 0) label = "Today, " + d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    if (i === 1) label = "Tomorrow, " + d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    dates.push(label);
  }
  return dates;
};

const TIME_SLOTS = ["10:30 AM", "01:15 PM", "04:30 PM", "08:00 PM"];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const ticketPrice = 150;
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDates] = useState(generateDates());

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a time slot.");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    navigate('/confirmation', {
      state: { selectedSeats, total, selectedDate, selectedTime }
    });
  };

  return (
    <section className="container booking-page">

      {/* HEADER */}
      <div className="booking-header">
        <h2>🎟️ Book Your Tickets</h2>
        <p className="subtitle">Choose your preferred date, time, and seats</p>
      </div>

      {/* DATE & TIME SELECTION */}
      <div className="datetime-selection">
        <h3>Select Date</h3>
        <div className="chip-container">
          {availableDates.map(date => (
            <button 
              key={date}
              className={`chip ${selectedDate === date ? 'active' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>

        <h3>Select Time</h3>
        <div className="chip-container">
          {TIME_SLOTS.map(time => (
            <button 
              key={time}
              className={`chip ${selectedTime === time ? 'active' : ''}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* SCREEN */}
      <div className="screen-container">
        <div className="screen"></div>
        <p className="screen-text">All eyes this way 👀</p>
      </div>

      {/* SEAT GRID */}
      <SeatGrid
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        ticketPrice={ticketPrice}
      />

      {/* BOOKING SUMMARY */}
      <div className="booking-summary">

        <div className="summary-details">
          <p>
            <strong>Seats:</strong>{" "}
            {selectedSeats.length > 0
              ? selectedSeats.map(seat => seat.id).join(', ')
              : 'None'}
          </p>

          <p>
            <strong>Total:</strong> ₹{total}
          </p>
        </div>

        <button
          className="btn full-btn"
          onClick={handleBooking}
        >
          Proceed to Pay
        </button>

      </div>

    </section>
  );
};

export default Booking;