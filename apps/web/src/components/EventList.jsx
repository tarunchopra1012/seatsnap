import { useEffect, useState } from 'react';

export default function EventList({ onSelect }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <section>
      <h2>Upcoming events</h2>
      <div className="grid">
        {events.map((event) => {
          const available = event.seats.filter((s) => s.status === 'available').length;
          return (
            <article key={event._id} className="card" onClick={() => onSelect(event._id)}>
              <h3>{event.title}</h3>
              <p className="muted">{event.venue}</p>
              <p className="muted">{new Date(event.date).toLocaleString()}</p>
              <p>
                ₹{event.price} · <strong>{available}</strong> of {event.seats.length} seats left
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
