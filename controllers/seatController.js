const db = require("../models");
const Seat = db.Seat;

async function createSeat(req, res) {
  try {
    const seat = await Seat.create({
      seatNumber: req.body.seatNumber,
      status: req.body.status,
    });

    res.status(201).json(seat);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create seat",
      error: error.message,
    });
  }
}

async function getAllSeats(req, res) {
  try {
    const seats = await Seat.findAll();
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch seats",
      error: error.message,
    });
  }
}

async function getSeatById(req, res) {
  try {
    const seat = await Seat.findByPk(req.params.id);

    if (!seat) {
      return res.status(404).json({
        message: "Seat not found",
      });
    }

    res.status(200).json(seat);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch seat",
      error: error.message,
    });
  }
}

async function updateSeat(req, res) {
  try {
    const seat = await Seat.findByPk(req.params.id);

    if (!seat) {
      return res.status(404).json({
        message: "Seat not found",
      });
    }

    await seat.update({
      seatNumber: req.body.seatNumber,
      status: req.body.status,
    });

    res.status(200).json(seat);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update seat",
      error: error.message,
    });
  }
}

async function deleteSeat(req, res) {
  try {
    const seat = await Seat.findByPk(req.params.id);

    if (!seat) {
      return res.status(404).json({
        message: "Seat not found",
      });
    }

    await seat.destroy();

    res.status(200).json({
      message: "Seat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete seat",
      error: error.message,
    });
  }
}

module.exports = {
  createSeat,
  getAllSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
};