const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

function buildSeats(rows, seatsPerRow) {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const row = String.fromCharCode(65 + r); // 0 -> "A", 1 -> "B" ...
    for (let n = 1; n <= seatsPerRow; n++) {
      seats.push({ label: `${row}${n}`, row, number: n });
    }
  }
  return seats;
}

// List all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Get one event with its seat map
router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

// Create an event and generate its seats
router.post('/', async (req, res) => {
  const { title, description, venue, date, price, rows, seatsPerRow } = req.body;
  const event = await Event.create({
    title,
    description,
    venue,
    date,
    price,
    seats: buildSeats(rows, seatsPerRow),
  });
  res.status(201).json(event);
});

// Book a seat
router.post('/:id/book', async (req, res) => {
  const { seatLabel, name } = req.body;

  const event = await Event.findById(req.params.id);
  const seat = event.seats.find((s) => s.label === seatLabel);

  if (!seat) {
    return res.status(404).json({ message: 'Seat not found' });
  }
  if (seat.status === 'booked') {
    return res.status(409).json({ message: 'Seat already booked' });
  }

  seat.status = 'booked';
  seat.bookedBy = name;
  seat.bookedAt = new Date();
  await event.save();

  res.json({ message: `Seat ${seatLabel} booked for ${name}`, seat });
});

module.exports = router;
