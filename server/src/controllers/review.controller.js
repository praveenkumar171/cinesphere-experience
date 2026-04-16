const Review = require("../models/Review");
const Payment = require("../models/Payment");  // for booking check via payment
const { movies } = require("../data/store");  // temp movies until migrated

/* ─── GET REVIEWS FOR A MOVIE ─── */
exports.getReviewsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const movieReviews = await Review.find({ movieId }).sort({ createdAt: -1 }).lean();
    res.json(movieReviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ─── CREATE REVIEW (must have paid for the movie) ─── */
exports.createReview = async (req, res) => {
  try {
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

    // Check if user has payment record for this movie
    const hasPayment = await Payment.exists({
      userId: req.user.id,
      movieId
    });
    if (!hasPayment) {
      return res.status(403).json({ message: "You must complete payment for a ticket to this movie before reviewing" });
    }

    // Check if user already reviewed
    const existingReview = await Review.exists({
      userId: req.user.id,
      movieId
    });
    if (existingReview) {
      return res.status(409).json({ message: "You have already reviewed this movie" });
    }

    const review = new Review({
      userId: req.user.id,
      userName: req.user.name,
      movieId,
      rating: Number(rating),
      comment: String(comment).slice(0, 500)
    });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
