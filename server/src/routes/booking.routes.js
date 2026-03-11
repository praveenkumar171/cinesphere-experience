const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { createBooking, getBookingById, cancelBooking } = require("../controllers/booking.controller");

router.post("/", auth, createBooking);
router.get("/:id", auth, getBookingById);
router.delete("/:id", auth, cancelBooking);

module.exports = router;
