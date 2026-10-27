require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/seatsnap';

function seats(rows, perRow) {
  const out = [];
  for (let r = 0; r < rows; r++) {
    const row = String.fromCharCode(65 + r);
    for (let n = 1; n <= perRow; n++) out.push({ label: `${row}${n}`, row, number: n });
  }
  return out;
}

const events = [
  { title: 'Indie Night Live', description: 'Three local bands, one stage.', venue: 'The Loft, Pune', date: new Date('2026-11-21T19:30:00'), price: 799, seats: seats(6, 10) },
  { title: 'JS Conf Mini', description: 'A day of talks on modern JavaScript.', venue: 'Tech Hub Auditorium, Bengaluru', date: new Date('2026-12-05T09:00:00'), price: 1499, seats: seats(8, 12) },
  { title: 'Stand-up Saturday', description: 'An evening of comedy.', venue: 'Laugh Club, Delhi', date: new Date('2026-11-28T20:00:00'), price: 499, seats: seats(5, 8) },
];

(async () => {
  await mongoose.connect(MONGO_URI);
  await Event.deleteMany({});
  await Event.insertMany(events);
  console.log(`Seeded ${events.length} events`);
  await mongoose.disconnect();
})();
