const { movies } = require("../data/store");
const { cloudinary, isCloudinaryConfigured } = require("../services/cloudinary");

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

/* ─── UPLOAD MOVIE IMAGE TO CLOUDINARY ─── */
exports.uploadMovieImage = async (req, res, next) => {
  try {
    if (!isCloudinaryConfigured()) {
      return res.status(500).json({ message: "Cloudinary is not configured" });
    }

    const { image, folder = "cinesphere/movies" } = req.body;

    if (!image || typeof image !== "string") {
      return res.status(400).json({ message: "image is required (URL, base64, or data URI)" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: "image",
      overwrite: true,
    });

    return res.status(201).json({
      secureUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    return next(error);
  }
};
