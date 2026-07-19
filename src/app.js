require('dotenv').config();
const express = require('express');
const path = require('path');

const waitlistRoutes = require('./routes/waitlist.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // ← ye line yahan add karo

// Root health check
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Game Waitlist API is running' });
});

app.use('/waitlist', waitlistRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.message);
  res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});