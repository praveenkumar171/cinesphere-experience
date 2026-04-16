const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  theatreId: {
    type: String,
    required: true
  },
  theatreName: {
    type: String,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  seats: {
    type: [String],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
