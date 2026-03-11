const { theatres } = require("../data/store");

/* ─── GET ALL THEATRES (optional filter: ?city=Trichy) ─── */
exports.getTheatres = (req, res) => {
  let result = [...theatres];
  const { city } = req.query;
  if (city) result = result.filter((t) => t.city.toLowerCase() === city.toLowerCase());
  res.json(result);
};

/* ─── GET SINGLE THEATRE ─── */
exports.getTheatreById = (req, res) => {
  const theatre = theatres.find((t) => t.id === req.params.id);
  if (!theatre) return res.status(404).json({ message: "Theatre not found" });
  res.json(theatre);
};
