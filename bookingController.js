import db from "../models/index.js";
import { Op } from "sequelize";

const { Booking, Seat, TimeSlot } = db;

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { userId, date, time, people, duration } = req.body;

    if (!userId || !date || !time || !people || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const startSlot = await TimeSlot.findOne({ where: { time } });

    if (!startSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    // get slots for requested duration
    const slots = await TimeSlot.findAll({
      where: {
        id: {
          [Op.between]: [startSlot.id, startSlot.id + duration - 1],
        },
      },
      order: [["id", "ASC"]],
    });

    if (slots.length !== Number(duration)) {
      return res
        .status(400)
        .json({ message: "Not enough time slots available" });
    }

    const seats = await Seat.findAll();

    const bookingsToCreate = [];

    for (const slot of slots) {
      const existingBookings = await Booking.findAll({
        where: {
          date,
          timeSlotId: slot.id,
        },
      });

      const takenSeatIds = existingBookings.map((b) => b.seatId);

      const availableSeat = seats.find((s) => !takenSeatIds.includes(s.id));

      if (!availableSeat) {
        return res
          .status(400)
          .json({ message: `No seats available at ${slot.time}` });
      }

      bookingsToCreate.push({
        userId,
        seatId: availableSeat.id,
        timeSlotId: slot.id,
        date,
        people: Number(people),
        duration: Number(duration),
      });
    }

    const createdBookings = await Booking.bulkCreate(bookingsToCreate);

    const freshBookings = await Booking.findAll({
      where: { id: createdBookings.map((b) => b.id) },
      attributes: [
        "id",
        "date",
        "userId",
        "seatId",
        "timeSlotId",
        "people",
        "duration",
        "createdAt",
        "updatedAt",
      ],
      include: [
        { model: Seat, attributes: ["seatNumber"] },
        { model: TimeSlot, attributes: ["time"] },
      ],
    });

    res.status(201).json({
      message: "Booking successful",
      bookings: freshBookings,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      attributes: [
        "id",
        "date",
        "userId",
        "seatId",
        "timeSlotId",
        "people",
        "duration",
        "createdAt",
        "updatedAt",
      ],
      include: [
        { model: Seat, attributes: ["seatNumber"] },
        { model: TimeSlot, attributes: ["time"] },
      ],
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      attributes: [
        "id",
        "date",
        "userId",
        "seatId",
        "timeSlotId",
        "people",
        "duration",
        "createdAt",
        "updatedAt",
      ],
      include: [
        { model: Seat, attributes: ["seatNumber"] },
        { model: TimeSlot, attributes: ["time"] },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CHECK AVAILABILITY
export const checkAvailability = async (req, res) => {
  try {
    const { date, time } = req.query;

    const timeSlot = await TimeSlot.findOne({ where: { time } });

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    const bookings = await Booking.findAll({
      where: { date, timeSlotId: timeSlot.id },
    });

    const totalSeats = await Seat.count();

    const bookedSeats = bookings.reduce((sum, b) => sum + (b.people || 1), 0);

    const availableSeats = totalSeats - bookedSeats;

    res.json({
      totalSeats,
      bookedSeats,
      availableSeats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STATISTICS
export const getStatistics = async (req, res) => {
  try {
    const { date } = req.query;

    const timeSlots = await TimeSlot.findAll();
    const totalSeats = await Seat.count();

    const stats = await Promise.all(
      timeSlots.map(async (slot) => {
        const bookings = await Booking.findAll({
          where: { date, timeSlotId: slot.id },
        });

        const bookedSeats = bookings.reduce(
          (sum, b) => sum + (b.people || 1),
          0
        );

        return {
          time: slot.time,
          timeSlotId: slot.id,
          bookedSeats,
          availableSeats: totalSeats - bookedSeats,
          totalSeats,
        };
      })
    );

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    await booking.update(req.body);

    res.json({
      message: "Updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    await booking.destroy();

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};