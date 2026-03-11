const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { getReviewsByMovie, createReview } = require("../controllers/review.controller");

// Public - anyone can read reviews
router.get("/:movieId", getReviewsByMovie);

// Protected - only users who booked the movie can post reviews
router.post("/:movieId", auth, createReview);

module.exports = router;
