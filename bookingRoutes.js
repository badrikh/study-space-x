const express = require("express");

const router = express.Router();

const bookingController = require("../controllers/bookingController");


// ================= GET ALL BOOKINGS =================
router.get("/", bookingController.getAllBookings);


// ================= CREATE BOOKING =================
router.post("/", bookingController.createBooking);


// ================= CHECK AVAILABILITY =================
router.get("/availability", bookingController.checkAvailability);


// ================= GET STATISTICS =================
router.get("/statistics", bookingController.getStatistics);


// ================= UPDATE BOOKING =================
router.put("/:id", bookingController.updateBooking);


// ================= DELETE BOOKING =================
router.delete("/:id", bookingController.deleteBooking);


module.exports = router;