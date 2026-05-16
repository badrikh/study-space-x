import db from "../models/index.js";

import { Op } from "sequelize";
const { Booking } = db;

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { userId, seatId, timeSlotId, date } = req.body;

    if (!userId || !seatId || !timeSlotId || !date) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingBooking = await Booking.findOne({
      where: { seatId, timeSlotId, date },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This seat is already booked",
      });
    }

    const booking = await Booking.create({
      userId,
      seatId,
      timeSlotId,
      date,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
};

// GET BY ID
export const getBookingById = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(booking);
};

// CHECK AVAILABILITY
export const checkAvailability = async (req, res) => {
  const { date, timeSlotId } = req.query;

  const bookings = await Booking.findAll({
    where: {
      date: {
        [Op.gte]: new Date(date + "T00:00:00.000Z"),
        [Op.lt]: new Date(date + "T23:59:59.999Z"),
      },
      timeSlotId,
    },
  });

  res.json({
    bookedSeats: bookings.map((b) => b.seatId),
  });
};

// STATISTICS
export const getStatistics = async (req, res) => {
  const { date } = req.query;

  const bookings = await Booking.findAll({
    where: {
      date: {
        [Op.gte]: new Date(date + "T00:00:00.000Z"),
        [Op.lt]: new Date(date + "T23:59:59.999Z"),
      },
    },
  });

  const stats = {};

  bookings.forEach((b) => {
    stats[b.timeSlotId] = (stats[b.timeSlotId] || 0) + 1;
  });

  res.json(stats);
};

// UPDATE
export const updateBooking = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);

  if (!booking) return res.status(404).json({ message: "Not found" });

  await booking.update(req.body);

  res.json({ message: "Updated", booking });
};

// DELETE
export const deleteBooking = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);

  if (!booking) return res.status(404).json({ message: "Not found" });

  await booking.destroy();

  res.json({ message: "Deleted" });
};