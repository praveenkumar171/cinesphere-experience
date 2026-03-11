const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { getProfile, getMyBookings } = require("../controllers/user.controller");

router.get("/profile", auth, getProfile);
router.get("/bookings", auth, getMyBookings);

module.exports = router;
