const express = require("express");
const cors = require("cors");
const { CLIENT_URL, NODE_ENV } = require("./config/env");
const errorMiddleware = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");
const showtimeRoutes = require("./routes/showtime.routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");
const paymentRoutes = require("./routes/payment.routes");

const app = express();

const allowedOrigins = (CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!allowedOrigins.includes("http://localhost:8080")) {
  allowedOrigins.push("http://localhost:8080");
}

if (!allowedOrigins.includes("http://localhost:5173")) {
  allowedOrigins.push("http://localhost:5173");
}

const isPrivateNetworkHost = (host) => {
  return (
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
  );
};

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  if (NODE_ENV !== "production") {
    try {
      const { hostname } = new URL(origin);
      if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "::1" ||
        isPrivateNetworkHost(hostname)
      ) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
};

/* ─── Middleware ─── */
app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
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
app.use("/api/payments", paymentRoutes);

/* ─── 404 ─── */
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ─── Error handler ─── */
app.use(errorMiddleware);

module.exports = app;
