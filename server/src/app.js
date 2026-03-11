const express = require("express");
const cors = require("cors");
const { CLIENT_URL } = require("./config/env");
const errorMiddleware = require("./middlewares/error.middleware");

// Route imports
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");
const showtimeRoutes = require("./routes/showtime.routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();

/* ─── Middleware ─── */
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

/* ─── Health check ─── */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ─── API Routes ─── */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

/* ─── 404 ─── */
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ─── Error handler ─── */
app.use(errorMiddleware);

module.exports = app;
