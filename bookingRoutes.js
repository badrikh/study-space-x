const express = require("express");

const router = express.Router();

const bookingController = require("../controllers/bookingController");


// GET all bookings
router.get("/", bookingController.getAllBookings);


// CREATE booking
router.post("/", bookingController.createBooking);


module.exports = router;