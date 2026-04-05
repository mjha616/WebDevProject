import React, { useMemo } from 'react';

const SeatGrid = ({ selectedSeats, setSelectedSeats }) => {
  const rows = 5;
  const cols = 8;

  // 🎟️ Seat pricing by row
  const getSeatPrice = (rowIndex) => {
    if (rowIndex < 2) return 120;   // Silver
    if (rowIndex < 4) return 180;   // Gold
    return 250;                     // VIP
  };

  // Generate structured seat data
  const seatLayout = useMemo(() => {
    const layout = [];

    for (let r = 0; r < rows; r++) {
      const rowLabel = String.fromCharCode(65 + r);
      const rowSeats = [];

      for (let c = 1; c <= cols; c++) {
        let tier = "VIP";
        if (r < 2) tier = "Silver";
        else if (r < 4) tier = "Gold";

        rowSeats.push({
          id: `${rowLabel}${c}`,
          price: getSeatPrice(r),
          tier
        });
      }

      layout.push({
        rowLabel,
        seats: rowSeats
      });
    }

    return layout;
  }, []);

  // Simulated booked seats
  const bookedSeats = useMemo(
    () => ['A3', 'A6', 'B5', 'C4', 'D7', 'E2'],
    []
  );

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat.id)) return;

    setSelectedSeats(prev =>
      prev.find(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

  return (
    <div className="seat-booking-wrapper">

      {/* LEGEND */}
      <div className="seat-legend">
        <div className="legend-item"><div className="seat silver"></div> Silver</div>
        <div className="legend-item"><div className="seat gold"></div> Gold</div>
        <div className="legend-item"><div className="seat vip"></div> VIP</div>
        <div className="legend-item"><div className="seat selected"></div> Selected</div>
        <div className="legend-item"><div className="seat booked"></div> Booked</div>
      </div>

      {/* GRID */}
      <div className="seat-layout">
        {seatLayout.map((row, rowIndex) => (
          <div key={row.rowLabel} className="seat-row">

            {/* ROW LABEL */}
            <div className="row-label">{row.rowLabel}</div>

            {/* SEATS */}
            {row.seats.map((seat, i) => {
              const isBooked = bookedSeats.includes(seat.id);
              const isSelected = selectedSeats.some(s => s.id === seat.id);

              let className = "seat";
              if (rowIndex < 2) className += " silver";
              else if (rowIndex < 4) className += " gold";
              else className += " vip";

              if (isBooked) className += " booked";
              else if (isSelected) className += " selected";

              return (
                <React.Fragment key={seat.id}>

                  {/* LEFT BLOCK */}
                  {i === 3 && <div className="aisle" />}

                  <div
                    className={className}
                    onClick={() => handleSeatClick(seat)}
                    title={`${seat.id} - ₹${seat.price}`}
                  >
                    <span className="seat-label">{seat.id}</span>
                  </div>

                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="booking-bar">
        <p>
          Seats: {selectedSeats.length > 0
            ? selectedSeats.map(s => `${s.id} (${s.tier})`).join(', ')
            : 'None'}
        </p>
        <p>
          Total: <strong>₹{total}</strong>
        </p>
      </div>

    </div>
  );
};

export default SeatGrid;