require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/events');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/seatsnap';

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
});
