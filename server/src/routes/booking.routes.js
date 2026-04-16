const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { createBooking, getBookingById, cancelBooking, getBookedSeats, getUserBookings } = require("../controllers/booking.controller");

router.post("/", auth, createBooking);
router.get("/my-bookings", auth, getUserBookings);
router.get("/seats/booked", getBookedSeats);
router.get("/:id", auth, getBookingById);
router.delete("/:id", auth, cancelBooking);

module.exports = router;
