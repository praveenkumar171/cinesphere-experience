const { users, bookings } = require("../data/store");

/* ─── GET PROFILE ─── */
exports.getProfile = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { password, ...safe } = user;
  res.json(safe);
};

/* ─── GET MY BOOKINGS ─── */
exports.getMyBookings = (req, res) => {
  const myBookings = bookings.filter((b) => b.userId === req.user.id);
  res.json(myBookings);
};
