const express = require("express");

const router = express.Router();

const seatController = require("../controllers/seatController");


// GET ALL
router.get("/", seatController.getAllSeats);


// CREATE
router.post("/", seatController.createSeat);


// UPDATE
router.put("/:id", seatController.updateSeat);


// DELETE
router.delete("/:id", seatController.deleteSeat);


module.exports = router;