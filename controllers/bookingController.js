const { Booking } = require("../models");


// GET all bookings
exports.getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.findAll();

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// CREATE booking
exports.createBooking = async (req, res) => {

    try {

        const booking = await Booking.create(req.body);

        res.status(201).json(booking);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};