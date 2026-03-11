const { v4: uuidv4 } = require("uuid");
const { bookings, bookedSeatsMap, showtimes, theatres, movies } = require("../data/store");

/* ─── CREATE BOOKING ─── */
exports.createBooking = (req, res) => {
  const { movieId, theatreId, time, seats } = req.body;
  // seats = ["A1","A2","B5"]

  if (!movieId || !theatreId || !time || !seats || !seats.length) {
    return res.status(400).json({ message: "movieId, theatreId, time and seats are required" });
  }

  const showtime = showtimes.find(
    (s) => s.theatreId === theatreId && s.movieId === movieId && s.times.includes(time)
  );
  if (!showtime) return res.status(404).json({ message: "Showtime not found" });

  const key = `${theatreId}-${movieId}-${time}`;
  if (!bookedSeatsMap[key]) bookedSeatsMap[key] = new Set();

  // Check if any seat is already booked
  const alreadyBooked = seats.filter((s) => bookedSeatsMap[key].has(s));
  if (alreadyBooked.length) {
    return res.status(409).json({ message: "Seats already booked", seats: alreadyBooked });
  }

  // Calculate price
  const theatre = theatres.find((t) => t.id === theatreId);
  const { vipRows, premiumRows } = theatre.seatLayout;
  let totalPrice = 0;
  seats.forEach((s) => {
    const rowIndex = s.charCodeAt(0) - 65; // A=0, B=1, ...
    let tier = "standard";
    if (rowIndex < vipRows) tier = "vip";
    else if (rowIndex < vipRows + premiumRows) tier = "premium";
    totalPrice += showtime.price[tier];
  });

  // Book the seats
  seats.forEach((s) => bookedSeatsMap[key].add(s));

  const movie = movies.find((m) => m.id === movieId);

  const booking = {
    id: uuidv4(),
    userId: req.user.id,
    movieId,
    movieTitle: movie?.title || "",
    theatreId,
    theatreName: theatre?.name || "",
    time,
    seats,
    totalPrice,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  res.status(201).json(booking);
};

/* ─── GET BOOKING BY ID ─── */
exports.getBookingById = (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id && b.userId === req.user.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
};

/* ─── CANCEL BOOKING ─── */
exports.cancelBooking = (req, res) => {
  const index = bookings.findIndex((b) => b.id === req.params.id && b.userId === req.user.id);
  if (index === -1) return res.status(404).json({ message: "Booking not found" });

  const booking = bookings[index];
  const key = `${booking.theatreId}-${booking.movieId}-${booking.time}`;

  // Free the seats
  if (bookedSeatsMap[key]) {
    booking.seats.forEach((s) => bookedSeatsMap[key].delete(s));
  }

  booking.status = "cancelled";
  res.json({ message: "Booking cancelled", booking });
};
