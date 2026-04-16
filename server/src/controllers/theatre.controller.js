const Theatre = require("../models/Theatre");

/* ─── GET ALL THEATRES (optional filter: ?city=Trichy) ─── */
exports.getTheatres = async (req, res) => {
  const { city } = req.query;

  const filter = city ? { city: new RegExp(`^${city}$`, "i") } : {};
  const result = await Theatre.find(filter).lean();

  res.json(result);
};

/* ─── GET SINGLE THEATRE ─── */
exports.getTheatreById = async (req, res) => {
  const theatre = await Theatre.findOne({ id: req.params.id }).lean();
  if (!theatre) return res.status(404).json({ message: "Theatre not found" });
  res.json(theatre);
};
