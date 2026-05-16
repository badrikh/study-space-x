import express from "express";
const router = express.Router();

import * as timeSlotController from "../controllers/timeSlotController.js";

router.get(
  "/",
  timeSlotController.getAllTimeSlots
);

router.post(
  "/",
  timeSlotController.createTimeSlot
);

router.put(
  "/:id",
  timeSlotController.updateTimeSlot
);

router.delete(
  "/:id",
  timeSlotController.deleteTimeSlot
);

export default router;