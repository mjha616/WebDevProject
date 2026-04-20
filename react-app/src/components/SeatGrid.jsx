import React, { useMemo } from 'react';

const GENRE_COLORS = {
  Action: '#ef4444',
  'Sci-Fi': '#6366f1',
  Horror: '#8b5cf6',
  Drama: '#f59e0b',
  Adventure: '#10b981',
  Romance: '#ec4899',
  Animation: '#14b8a6',
};

const SeatGrid = ({ selectedSeats, setSelectedSeats, bookedSeats = [], disabled = false }) => {
  const rows = 5;
  const cols = 8;

  const getSeatPrice = (rowIndex) => {
    if (rowIndex < 2) return 120;   // Silver
    if (rowIndex < 4) return 180;   // Gold
    return 250;                      // VIP
  };

  const seatLayout = useMemo(() => {
    const layout = [];
    for (let r = 0; r < rows; r++) {
      const rowLabel = String.fromCharCode(65 + r);
      const rowSeats = [];
      for (let c = 1; c <= cols; c++) {
        let tier = 'VIP';
        if (r < 2) tier = 'Silver';
        else if (r < 4) tier = 'Gold';

        rowSeats.push({
          id: `${rowLabel}${c}`,
          price: getSeatPrice(r),
          tier,
        });
      }
      layout.push({ rowLabel, seats: rowSeats });
    }
    return layout;
  }, []);

  const handleSeatClick = (seat) => {
    if (disabled || bookedSeats.includes(seat.id)) return;

    setSelectedSeats((prev) =>
      prev.find((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  return (
    <div className={`seat-wrapper ${disabled ? 'seats-disabled' : ''}`}>

      {/* TIER LEGEND */}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat silver" />
          <span>Silver ₹120</span>
        </div>
        <div className="legend-item">
          <div className="seat gold" />
          <span>Gold ₹180</span>
        </div>
        <div className="legend-item">
          <div className="seat vip" />
          <span>VIP ₹250</span>
        </div>
        <div className="legend-item">
          <div className="seat selected" />
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat booked" />
          <span>Booked</span>
        </div>
      </div>

      {/* SEAT GRID */}
      <div className="seat-layout">
        {seatLayout.map((row, rowIndex) => (
          <div key={row.rowLabel} className="seat-row">

            <div className="row-label">{row.rowLabel}</div>

            {row.seats.map((seat, i) => {
              const isBooked = bookedSeats.includes(seat.id);
              const isSelected = selectedSeats.some((s) => s.id === seat.id);

              let cls = 'seat';
              if (rowIndex < 2) cls += ' silver';
              else if (rowIndex < 4) cls += ' gold';
              else cls += ' vip';

              if (isBooked) cls += ' booked';
              else if (isSelected) cls += ' selected';

              return (
                <React.Fragment key={seat.id}>
                  {i === 4 && <div className="aisle" />}
                  <div
                    className={cls}
                    onClick={() => handleSeatClick(seat)}
                    title={isBooked ? `${seat.id} — Booked` : `${seat.id} | ${seat.tier} | ₹${seat.price}`}
                    role="button"
                    aria-label={`Seat ${seat.id}`}
                    tabIndex={isBooked ? -1 : 0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSeatClick(seat)}
                  >
                    <span className="seat-label">{seat.id}</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      {/* MINI SUMMARY */}
      <div className="seat-summary-bar">
        <span>
          {selectedSeats.length > 0
            ? `${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''} selected: ${selectedSeats.map((s) => s.id).join(', ')}`
            : 'No seats selected'}
        </span>
        <strong>₹{selectedSeats.reduce((s, seat) => s + seat.price, 0)}</strong>
      </div>

    </div>
  );
};

export default SeatGrid;