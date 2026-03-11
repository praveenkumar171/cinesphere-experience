const { movies } = require("../data/store");

/* ─── GET ALL MOVIES (optional filters: ?status=now-showing&language=Tamil&genre=Action) ─── */
exports.getMovies = (req, res) => {
  let result = [...movies];
  const { status, language, genre, search } = req.query;

  if (status) result = result.filter((m) => m.status === status);
  if (language) result = result.filter((m) => m.language.toLowerCase().includes(language.toLowerCase()));
  if (genre) result = result.filter((m) => m.genre.some((g) => g.toLowerCase() === genre.toLowerCase()));
  if (search) result = result.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  res.json(result);
};

/* ─── GET SINGLE MOVIE ─── */
exports.getMovieById = (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
};
