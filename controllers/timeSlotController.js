const { TimeSlot } = require("../models");

// Get all time slots
const getAllTimeSlots = async (req, res) => {
  try {
    const timeSlots = await TimeSlot.findAll();
    res.status(200).json(timeSlots);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch time slots",
      error: error.message,
    });
  }
};

// Get time slot by id
const getTimeSlotById = async (req, res) => {
  try {
    const timeSlot = await TimeSlot.findByPk(req.params.id);

    if (!timeSlot) {
      return res.status(404).json({
        message: "Time slot not found",
      });
    }

    res.status(200).json(timeSlot);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch time slot",
      error: error.message,
    });
  }
};

// Create new time slot
const createTimeSlot = async (req, res) => {
  try {
    const newTimeSlot = await TimeSlot.create(req.body);

    res.status(201).json(newTimeSlot);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create time slot",
      error: error.message,
    });
  }
};

// Update time slot
const updateTimeSlot = async (req, res) => {
  try {
    const timeSlot = await TimeSlot.findByPk(req.params.id);

    if (!timeSlot) {
      return res.status(404).json({
        message: "Time slot not found",
      });
    }

    await timeSlot.update(req.body);

    res.status(200).json(timeSlot);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update time slot",
      error: error.message,
    });
  }
};

// Delete time slot
const deleteTimeSlot = async (req, res) => {
  try {
    const timeSlot = await TimeSlot.findByPk(req.params.id);

    if (!timeSlot) {
      return res.status(404).json({
        message: "Time slot not found",
      });
    }

    await timeSlot.destroy();

    res.status(200).json({
      message: "Time slot deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete time slot",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTimeSlots,
  getTimeSlotById,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};