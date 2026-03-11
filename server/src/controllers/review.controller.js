const { v4: uuidv4 } = require("uuid");
const { reviews, bookings, movies } = require("../data/store");

/* ─── GET REVIEWS FOR A MOVIE ─── */
exports.getReviewsByMovie = (req, res) => {
  const { movieId } = req.params;
  const movie = movies.find((m) => m.id === movieId);
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  const movieReviews = reviews.filter((r) => r.movieId === movieId);
  res.json(movieReviews);
};

/* ─── CREATE REVIEW (must have booked the movie) ─── */
exports.createReview = (req, res) => {
  const { movieId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ message: "rating and comment are required" });
  }

  if (rating < 1 || rating > 10) {
    return res.status(400).json({ message: "rating must be between 1 and 10" });
  }

  const movie = movies.find((m) => m.id === movieId);
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  // Check if the user has a confirmed booking for this movie
  const hasBooking = bookings.some(
    (b) => b.userId === req.user.id && b.movieId === movieId && b.status === "confirmed"
  );
  if (!hasBooking) {
    return res.status(403).json({ message: "You must book a ticket for this movie before reviewing" });
  }

  // Check if user already reviewed this movie
  const existingReview = reviews.find(
    (r) => r.userId === req.user.id && r.movieId === movieId
  );
  if (existingReview) {
    return res.status(409).json({ message: "You have already reviewed this movie" });
  }

  const review = {
    id: uuidv4(),
    userId: req.user.id,
    userName: req.user.name,
    movieId,
    rating: Number(rating),
    comment: String(comment).slice(0, 500),
    createdAt: new Date().toISOString(),
  };

  reviews.push(review);
  res.status(201).json(review);
};
