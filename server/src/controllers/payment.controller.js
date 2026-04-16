const Payment = require('../models/Payment');
const { movies } = require('../data/store');  // temp for movie title

/* ─── CREATE PAYMENT (on booking confirmation) ─── */
exports.createPayment = async (req, res) => {
  try {
    const { movieId, theatreId, showTime, seats, totalAmount } = req.body;

    if (!movieId || !theatreId || !showTime || !seats || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const payment = new Payment({
      userId: req.user.id,
      userName: req.user.name,
      movieId,
      movieTitle: movie.title,
      theatreId,
      showTime,
      seats: Array.isArray(seats) ? seats : seats.split(','),
      totalAmount: Number(totalAmount)
    });

    await payment.save();

    res.status(201).json({ 
      message: 'Payment recorded successfully',
      paymentId: payment._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

