const mongoose = require('mongoose');

// Seats are embedded inside the event document.
const seatSchema = new mongoose.Schema({
  label: String, // e.g. "A1"
  row: String,
  number: Number,
  status: { type: String, default: 'available' },
  bookedBy: String,
  bookedAt: Date,
});

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    venue: String,
    date: Date,
    price: Number,
    seats: [seatSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
