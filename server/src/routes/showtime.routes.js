const router = require("express").Router();
const { getShowtimes, getSeatAvailability } = require("../controllers/showtime.controller");

router.get("/", getShowtimes);
router.get("/seats", getSeatAvailability);

module.exports = router;
