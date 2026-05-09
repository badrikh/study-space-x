const { Booking } = require("../models");
const { Op } = require("sequelize");


// ================= CREATE BOOKING =================
const createBooking = async (req, res) => {
    try {
        const { userId, seatId, timeSlotId, date } = req.body;

        if (!userId || !seatId || !timeSlotId || !date) {
            return res.status(400).json({
                message: "Missing required fields",
                required: ["userId", "seatId", "timeSlotId", "date"]
            });
        }

        const existingBooking = await Booking.findOne({
            where: { seatId, timeSlotId, date }
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "This seat is already booked for this time slot"
            });
        }

        const booking = await Booking.create({ userId, seatId, timeSlotId, date });

        return res.status(201).json({
            message: "Booking successful",
            booking
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// ================= GET ALL BOOKINGS =================
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        return res.json(bookings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// ================= GET BOOKING BY ID =================
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.json(booking);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// ================= CHECK AVAILABILITY =================
const checkAvailability = async (req, res) => {
    try {
        const { date, timeSlotId } = req.query;

        if (!date || !timeSlotId) {
            return res.status(400).json({
                message: "date and timeSlotId are required"
            });
        }

        const bookings = await Booking.findAll({
            where: {
                date: {
                    [Op.gte]: new Date(date + "T00:00:00.000Z"),
                    [Op.lt]: new Date(date + "T23:59:59.999Z")
                },
                timeSlotId
            }
        });

        const bookedSeats = bookings.map(b => b.seatId);

        return res.json({ date, timeSlotId, bookedSeats });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// ================= STATISTICS =================
const getStatistics = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: "date is required" });
        }

        const bookings = await Booking.findAll({
            where: {
                date: {
                    [Op.gte]: new Date(date + "T00:00:00.000Z"),
                    [Op.lt]: new Date(date + "T23:59:59.999Z")
                }
            }
        });

        const stats = {};

        bookings.forEach(b => {
            const slot = b.timeSlotId;
            if (!stats[slot]) stats[slot] = 0;
            stats[slot]++;
        });

        const result = {};

        for (let slot in stats) {
            const count = stats[slot];
            if (count <= 2)      result[slot] = "Quiet";
            else if (count <= 5) result[slot] = "Moderate";
            else                 result[slot] = "Busy";
        }

        return res.json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// ================= UPDATE BOOKING =================
const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const { seatId, timeSlotId, date } = req.body;

        if (seatId && timeSlotId && date) {
            const existingBooking = await Booking.findOne({
                where: { seatId, timeSlotId, date }
            });

            if (existingBooking && existingBooking.id !== booking.id) {
                return res.status(400).json({ message: "This slot is already taken" });
            }
        }

        await booking.update(req.body);

        return res.json({ message: "Booking updated", booking });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// ================= DELETE BOOKING =================
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await booking.destroy();

        return res.json({ message: "Booking deleted" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// ================= EXPORTS =================
module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    checkAvailability,
    getStatistics,
    updateBooking,
    deleteBooking
};