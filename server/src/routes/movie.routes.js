const router = require("express").Router();
const { getMovies, getMovieById } = require("../controllers/movie.controller");

router.get("/", getMovies);
router.get("/:id", getMovieById);

module.exports = router;
