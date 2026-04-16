const { bookings } = require("../data/store");
const User = require("../models/User");

/* ─── GET PROFILE ─── */
exports.getProfile = async (req, res) => {
  const user = await User.findOne({ id: req.user.id }).lean();
  if (!user) return res.status(404).json({ message: "User not found" });

  const { password, ...safe } = user;
  res.json(safe);
};

/* ─── GET MY BOOKINGS ─── */
exports.getMyBookings = (req, res) => {
  const myBookings = bookings.filter((b) => b.userId === req.user.id);
  res.json(myBookings);
};
