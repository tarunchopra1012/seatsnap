import { useEffect, useState } from 'react';

export default function EventDetail({ eventId, onBack }) {
  const [event, setEvent] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, [eventId]);

  const book = async () => {
    const res = await fetch(`/api/events/${eventId}/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatLabel: selectedSeat, name }),
    });
    const data = await res.json();
    alert(data.message);

    // Reload the whole event to show the new seat status
    const updated = await fetch(`/api/events/${eventId}`).then((r) => r.json());
    setEvent(updated);
    setSelectedSeat(null);
  };

  if (!event) return <p>Loading...</p>;

  // Group seats by row for the seat map
  const rows = {};
  event.seats.forEach((seat) => {
    rows[seat.row] = rows[seat.row] || [];
    rows[seat.row].push(seat);
  });

  return (
    <section>
      <button className="link" onClick={onBack}>← All events</button>
      <h2>{event.title}</h2>
      <p className="muted">
        {event.venue} · {new Date(event.date).toLocaleString()} · ₹{event.price}
      </p>
      <p>{event.description}</p>

      <div className="stage">STAGE</div>
      <div className="seatmap">
        {Object.keys(rows).map((row) => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {rows[row].map((seat) => (
              <button
                key={seat.label}
                className={`seat ${seat.status} ${selectedSeat === seat.label ? 'selected' : ''}`}
                disabled={seat.status === 'booked'}
                onClick={() => setSelectedSeat(seat.label)}
                title={seat.label}
              >
                {seat.number}
              </button>
            ))}
          </div>
        ))}
      </div>

      {selectedSeat && (
        <div className="booking">
          <p>
            Selected seat: <strong>{selectedSeat}</strong>
          </p>
          <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={book}>Book seat</button>
        </div>
      )}
    </section>
  );
}
