const { Seat } = require("../models");


// GET ALL SEATS
const getAllSeats = async (req, res) => {

    try {

        const seats = await Seat.findAll();

        res.json(seats);

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};


// CREATE SEAT
const createSeat = async (req, res) => {

    try {

        const seat = await Seat.create(req.body);

        res.status(201).json(seat);

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};


// UPDATE SEAT
const updateSeat = async (req, res) => {

    try {

        const seat = await Seat.findByPk(req.params.id);

        if(!seat){

            return res.status(404).json({
                message: "Seat not found"
            });

        }

        await seat.update(req.body);

        res.json({
            message: "Seat updated",
            seat
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};


// DELETE SEAT
const deleteSeat = async (req, res) => {

    try {

        const seat = await Seat.findByPk(req.params.id);

        if(!seat){

            return res.status(404).json({
                message: "Seat not found"
            });

        }

        await seat.destroy();

        res.json({
            message: "Seat deleted"
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {

    getAllSeats,

    createSeat,

    updateSeat,

    deleteSeat

};