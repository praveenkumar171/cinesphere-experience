const { showtimes, bookedSeatsMap, theatres } = require("../data/store");

/* ─── GET SHOWTIMES (filter: ?movieId=1&city=Trichy&theatreId=t1) ─── */
exports.getShowtimes = (req, res) => {
  let result = [...showtimes];
  const { movieId, theatreId, city } = req.query;

  if (movieId) result = result.filter((s) => s.movieId === movieId);
  if (theatreId) result = result.filter((s) => s.theatreId === theatreId);
  if (city) {
    const cityTheatreIds = theatres
      .filter((t) => t.city.toLowerCase() === city.toLowerCase())
      .map((t) => t.id);
    result = result.filter((s) => cityTheatreIds.includes(s.theatreId));
  }

  res.json(result);
};

/* ─── GET SEAT AVAILABILITY for a specific show ─── */
exports.getSeatAvailability = (req, res) => {
  const { theatreId, movieId, time } = req.query;

  if (!theatreId || !movieId || !time) {
    return res.status(400).json({ message: "theatreId, movieId and time are required" });
  }

  const theatre = theatres.find((t) => t.id === theatreId);
  if (!theatre) return res.status(404).json({ message: "Theatre not found" });

  const key = `${theatreId}-${movieId}-${time}`;
  const booked = bookedSeatsMap[key] ? [...bookedSeatsMap[key]] : [];

  res.json({
    seatLayout: theatre.seatLayout,
    bookedSeats: booked,
  });
};
