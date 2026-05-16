import express from "express";
const router = express.Router();

import * as bookingController from "../controllers/bookingController.js";

router.get(
  "/availability",
  bookingController.checkAvailability
);

router.get(
  "/statistics",
  bookingController.getStatistics
);

router.get(
  "/",
  bookingController.getAllBookings
);

router.post(
  "/",
  bookingController.createBooking
);

router.get(
  "/:id",
  bookingController.getBookingById
);

router.put(
  "/:id",
  bookingController.updateBooking
);

router.delete(
  "/:id",
  bookingController.deleteBooking
);

export default router;