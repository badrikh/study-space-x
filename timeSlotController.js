const { TimeSlot } = require("../models");


// GET ALL
const getAllTimeSlots = async (req, res) => {

    try {

        const timeSlots = await TimeSlot.findAll();

        res.json(timeSlots);

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};


// CREATE
const createTimeSlot = async (req, res) => {

    try {

        const timeSlot = await TimeSlot.create(req.body);

        res.status(201).json(timeSlot);

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};


// UPDATE
const updateTimeSlot = async (req, res) => {

    try {

        const timeSlot = await TimeSlot.findByPk(req.params.id);

        if(!timeSlot){

            return res.status(404).json({
                message: "TimeSlot not found"
            });

        }

        await timeSlot.update(req.body);

        res.json({
            message: "TimeSlot updated",
            timeSlot
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};


// DELETE
const deleteTimeSlot = async (req, res) => {

    try {

        const timeSlot = await TimeSlot.findByPk(req.params.id);

        if(!timeSlot){

            return res.status(404).json({
                message: "TimeSlot not found"
            });

        }

        await timeSlot.destroy();

        res.json({
            message: "TimeSlot deleted"
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {

    getAllTimeSlots,

    createTimeSlot,

    updateTimeSlot,

    deleteTimeSlot

};