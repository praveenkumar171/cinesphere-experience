const router = require("express").Router();
const {
	getMovies,
	getMovieById,
	uploadMovieImage,
} = require("../controllers/movie.controller");

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/upload-image", uploadMovieImage);

module.exports = router;
