import { useState } from 'react';

export default function CreateEvent({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    venue: '',
    date: '',
    price: '',
    rows: '',
    seatsPerRow: '',
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    onCreated();
  };

  return (
    <section>
      <h2>Create an event</h2>
      <form className="form" onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={update('title')} />
        <textarea placeholder="Description" value={form.description} onChange={update('description')} />
        <input placeholder="Venue" value={form.venue} onChange={update('venue')} />
        <input type="datetime-local" value={form.date} onChange={update('date')} />
        <input placeholder="Price (₹)" value={form.price} onChange={update('price')} />
        <div className="row">
          <input placeholder="Rows" value={form.rows} onChange={update('rows')} />
          <input placeholder="Seats per row" value={form.seatsPerRow} onChange={update('seatsPerRow')} />
        </div>
        <button type="submit">Create event</button>
      </form>
    </section>
  );
}
