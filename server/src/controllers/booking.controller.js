const Booking = require("../models/Booking");
const { showtimes, theatres, movies } = require("../data/store");

/* ─── CREATE BOOKING ─── */
exports.createBooking = async (req, res) => {
  try {
    const { movieId, theatreId, time, seats } = req.body;
    
    console.log("Creating booking:", { movieId, theatreId, time, seats, userId: req.user?.id, userName: req.user?.name });
    
    if (!movieId || !theatreId || !time || !seats || !seats.length) {
      return res.status(400).json({ message: "movieId, theatreId, time and seats are required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated - missing user id" });
    }

    const showtime = showtimes.find(
      (s) => s.theatreId === theatreId && s.movieId === movieId && s.times.includes(time)
    );
    if (!showtime) return res.status(404).json({ message: "Showtime not found" });

    // Check if any seat is already booked
    const existingBookings = await Booking.find(
      { movieId, theatreId, showTime: time, status: "confirmed" }
    );
    const bookedSeats = existingBookings.flatMap(b => b.seats);
    const alreadyBooked = seats.filter((s) => bookedSeats.includes(s));
    
    if (alreadyBooked.length) {
      return res.status(409).json({ message: "Seats already booked", seats: alreadyBooked });
    }

    // Calculate price
    const theatre = theatres.find((t) => t.id === theatreId);
    const movie = movies.find((m) => m.id === movieId);
    
    if (!theatre || !movie) {
      return res.status(404).json({ message: "Theatre or Movie not found" });
    }
    
    const { vipRows, premiumRows } = theatre.seatLayout;
    
    let totalPrice = 0;
    seats.forEach((s) => {
      const rowIndex = s.charCodeAt(0) - 65; // A=0, B=1, ...
      let tier = "standard";
      if (rowIndex < vipRows) tier = "vip";
      else if (rowIndex < vipRows + premiumRows) tier = "premium";
      totalPrice += showtime.price[tier];
    });

    // Create booking in MongoDB
    const booking = new Booking({
      userId: req.user.id,
      userName: req.user.name,
      movieId,
      movieTitle: movie?.title || "",
      theatreId,
      theatreName: theatre?.name || "",
      showTime: time,
      seats,
      totalPrice,
      status: "confirmed"
    });

    const savedBooking = await booking.save();
    console.log("Booking created successfully:", savedBooking);
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ─── GET BOOKING BY ID ─── */
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ─── CANCEL BOOKING ─── */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ─── GET BOOKED SEATS FOR A SHOWTIME ─── */
exports.getBookedSeats = async (req, res) => {
  try {
    const { movieId, theatreId, showTime } = req.query;
    
    if (!movieId || !theatreId || !showTime) {
      return res.status(400).json({ message: "movieId, theatreId, and showTime are required" });
    }

    const bookings = await Booking.find(
      { movieId, theatreId, showTime, status: "confirmed" }
    );
    
    const bookedSeats = bookings.flatMap(b => b.seats);
    res.json({ bookedSeats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ─── GET USER'S BOOKINGS ─── */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
