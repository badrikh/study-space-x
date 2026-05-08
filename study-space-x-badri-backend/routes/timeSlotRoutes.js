const express = require("express");

const router = express.Router();

const timeSlotController = require("../controllers/timeSlotController");


// GET ALL
router.get("/", timeSlotController.getAllTimeSlots);


// CREATE
router.post("/", timeSlotController.createTimeSlot);


// UPDATE
router.put("/:id", timeSlotController.updateTimeSlot);


// DELETE
router.delete("/:id", timeSlotController.deleteTimeSlot);


module.exports = router;